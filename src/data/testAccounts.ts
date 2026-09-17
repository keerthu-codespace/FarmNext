import { UserAccount } from '../types';

export const TEST_ACCOUNTS: UserAccount[] = [
  {
    id: 'usr-landowner-01',
    name: 'Savitri Gowda',
    email: 'savitri.gowda@farmnext.in',
    phone: '+91 94801 23456',
    role: 'landowner',
    location: 'Mandya, Karnataka',
    avatarInitials: 'SG',
    title: 'Landowner & Field Custodian',
    details: {
      landowner: {
        acreage: 2.0,
        farmName: 'Green Valley Farm',
        surveyNumber: 'SY-142/B',
        soilType: 'Red Sandy Loam'
      }
    }
  },
  {
    id: 'usr-worker-01',
    name: 'Ramesh Kumar',
    email: 'ramesh.kumar@farmnext.in',
    phone: '+91 98452 78901',
    role: 'worker',
    location: 'Mandya District, Karnataka',
    avatarInitials: 'RK',
    title: 'Certified Agricultural Specialist',
    details: {
      worker: {
        skills: ['Drip Irrigation Setup', 'Precision Groundnut Sowing', 'Organic Pest Shield', 'Micro-Weeding'],
        experienceYears: 8,
        passportId: 'FN-SKILL-MND-402',
        reliabilityScore: 94,
        dailyWage: 650
      }
    }
  },
  {
    id: 'usr-urban-01',
    name: 'Ananya Sharma',
    email: 'ananya.sharma@farmnext.in',
    phone: '+91 99012 34567',
    role: 'urban_cofarmer',
    location: 'Indiranagar, Bangalore, Karnataka',
    avatarInitials: 'AS',
    title: 'Remote Co-Farm Sponsor',
    details: {
      urbanCoFarmer: {
        participatingFarmsCount: 1,
        preferences: ['Regenerative Groundnut', 'Chemical-Free Pulses', 'Soil Health Monitoring'],
        totalContribution: '₹45,000'
      }
    }
  }
];
