require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const mongoose = require('mongoose');
const College = require('../models/College');

const OGD_API_KEY = process.env.OGD_API_KEY;
const MONGO_URI = process.env.MONGO_URI;

// Resource ID for "Institutional Basic Information - AISHE 2021-22"
// Note: This ID might vary based on dataset updates
const RESOURCE_ID = '579b464d-b66e-c23b-dd00-000160544d14'; 

async function syncColleges() {
  try {
    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected.');

    let offset = 0;
    const limit = 100;
    let totalSynced = 0;
    let hasMore = true;

    while (hasMore) {
      console.log(`📦 Fetching records ${offset} to ${offset + limit}...`);
      
      const url = `https://api.data.gov.in/resource/${RESOURCE_ID}?api-key=${OGD_API_KEY}&format=json&limit=${limit}&offset=${offset}`;
      
      let attempt = 0;
      let response;
      while (attempt < 3) {
        try {
          response = await fetch(url);
          if (response.ok) break;
        } catch (e) {
          attempt++;
          console.warn(`⚠️ Attempt ${attempt} failed. Retrying...`);
          if (attempt === 3) throw e;
          await new Promise(r => setTimeout(r, 2000));
        }
      }

      const data = await response.json();

      if (!data || !data.records || data.records.length === 0) {
        hasMore = false;
        break;
      }

      const maharashtraRecords = data.records.filter(r => 
        r.state_name?.toLowerCase() === 'maharashtra' || 
        r.state?.toLowerCase() === 'maharashtra'
      );

      for (const record of maharashtraRecords) {
        const aisheCode = record.college_code || record.aishe_code;
        if (!aisheCode) continue;

        await College.findOneAndUpdate(
          { aisheCode },
          {
            name: record.college_name || record.name,
            city: record.city || record.district || 'Unknown',
            district: record.district || 'Unknown',
            address: record.address_line1 || record.address,
            type: mapType(record.management_type || record.type),
            affiliation: record.university_name || record.affiliation,
            state: 'Maharashtra',
            aisheCode
          },
          { upsert: true, new: true }
        );
        totalSynced++;
      }

      console.log(`✅ Synced ${maharashtraRecords.length} records from this batch.`);
      
      offset += limit;
      // Safety limit for testing - remove if you want full 4000+ colleges immediately
      if (offset >= 500) {
        console.log('⚠️ Reached local testing limit (500). Stopping Sync.');
        hasMore = false;
      }
    }

    console.log(`🎉 Sync Complete! Total colleges in database: ${totalSynced}`);
    process.exit(0);
  } catch (err) {
    console.error('❌ Sync Error:', err);
    process.exit(1);
  }
}

function mapType(govtType) {
  if (!govtType) return 'Private';
  const t = govtType.toLowerCase();
  if (t.includes('government')) return 'Government';
  if (t.includes('aided')) return 'Autonomous';
  if (t.includes('deemed')) return 'Deemed';
  return 'Private';
}

syncColleges();
