# Install dependencies
npm install

# Install PM2 globally
npm install -g pm2

# Start the application with PM2
pm2 start app.js --name "gamestream"

# Save the PM2 process list
pm2 save

# Setup PM2 to start on system boot
pm2 startup