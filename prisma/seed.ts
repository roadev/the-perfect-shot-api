import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed...');

  // Create Tatacoa Desert location
  const tatacoa = await prisma.location.upsert({
    where: { 
      id: 'tatacoa-desert-001'
    },
    update: {},
    create: {
      id: 'tatacoa-desert-001',
      name: 'Tatacoa Desert',
      latitude: 3.2333,
      longitude: -75.1667,
      elevation: 800,
      bortleScale: 2,
    },
  });

  console.log('Created location:', tatacoa);

  // Generate forecasts for next 48 hours
  const now = new Date();
  const forecasts: Prisma.WeatherForecastCreateManyInput[] = [];
  
  for (let i = 0; i < 48; i++) {
    const forecastDate = new Date(now.getTime() + i * 60 * 60 * 1000);
    
    // Simulate realistic cloud cover patterns
    // Clear skies at night, some clouds during day
    const hour = forecastDate.getHours();
    let cloudCover: number;
    
    if (hour >= 20 || hour <= 5) {
      // Night time - clearer skies
      cloudCover = Math.floor(Math.random() * 30) + 5; // 5-35%
    } else if (hour >= 6 && hour <= 18) {
      // Day time - more variable
      cloudCover = Math.floor(Math.random() * 60) + 10; // 10-70%
    } else {
      // Twilight - moderate
      cloudCover = Math.floor(Math.random() * 40) + 15; // 15-55%
    }
    
    // Calculate sky score based on cloud cover and bortle scale
    const bortleImpact = (tatacoa.bortleScale - 1) * 5;
    const skyScore = Math.max(0, Math.min(100, 100 - cloudCover - bortleImpact));
    
    forecasts.push({
      date: forecastDate,
      cloudCover,
      seeing: 1.5 + Math.random() * 1.5, // 1.5-3.0 arcseconds
      skyScore,
      locationId: tatacoa.id,
    });
  }

  // Delete existing forecasts for this location
  await prisma.weatherForecast.deleteMany({
    where: { locationId: tatacoa.id },
  });

  // Create new forecasts
  await prisma.weatherForecast.createMany({
    data: forecasts,
  });

  console.log(`Created ${forecasts.length} weather forecasts for ${tatacoa.name}`);

  // Create some celestial events
  const events = [
    {
      name: 'Perseids Meteor Shower',
      startDate: new Date('2025-08-11'),
      peakDate: new Date('2025-08-12'),
      endDate: new Date('2025-08-13'),
    },
    {
      name: 'Geminids Meteor Shower',
      startDate: new Date('2025-12-13'),
      peakDate: new Date('2025-12-14'),
      endDate: new Date('2025-12-15'),
    },
  ];

  for (const event of events) {
    await prisma.celestialEvent.upsert({
      where: { id: `${event.name.toLowerCase().replace(/\s+/g, '-')}-2025` },
      update: {},
      create: {
        id: `${event.name.toLowerCase().replace(/\s+/g, '-')}-2025`,
        ...event,
      },
    });
  }

  console.log('Created celestial events');

  console.log('Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('Error during seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
