require('dotenv').config();
const mongoose = require('mongoose');

async function testConnection() {
    try {
        console.log('Attempting to connect to:', process.env.MONGODB_URI.replace(/:[^:]*@/, ':***@'));
        
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ MongoDB Atlas connection successful!');
        
        // Test a simple operation
        const testCollection = mongoose.connection.db.collection('test');
        await testCollection.insertOne({ test: 'connection', timestamp: new Date() });
        console.log('✅ Test document inserted successfully!');
        
        await mongoose.connection.close();
        console.log('✅ Connection closed successfully!');
        
    } catch (error) {
        console.error('❌ MongoDB connection failed:');
        console.error('Error code:', error.code);
        console.error('Error message:', error.message);
        
        if (error.code === 8000) {
            console.log('\n🔍 Troubleshooting tips:');
            console.log('1. Verify your username and password in MongoDB Atlas');
            console.log('2. Check that your IP address is whitelisted in Network Access');
            console.log('3. Ensure the database user has the correct permissions');
        }
        
        process.exit(1);
    }
}

testConnection();
