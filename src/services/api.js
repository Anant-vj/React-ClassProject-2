import axios from 'axios';
import { generateId } from '../utils/helpers';

export const fetchDummyJobs = async () => {
  try {
    const response = await axios.get('https://dummyjson.com/products?limit=10');
    // Map products to mock job applications to satisfy the PRD requirement
    const mockJobs = response.data.products.map((product, index) => {
      const statuses = ['Applied', 'Interviewing', 'Offer', 'Rejected'];
      const randomStatus = statuses[index % statuses.length];
      
      const platforms = ['LinkedIn', 'Company Website', 'Referral', 'Indeed'];
      const randomPlatform = platforms[index % platforms.length];
      
      // Calculate random dates within the last 30 days
      const appliedDate = new Date();
      appliedDate.setDate(appliedDate.getDate() - Math.floor(Math.random() * 30));
      
      let interviewDate = null;
      if (randomStatus === 'Interviewing' || randomStatus === 'Offer') {
        interviewDate = new Date(appliedDate);
        interviewDate.setDate(interviewDate.getDate() + Math.floor(Math.random() * 14) + 1);
      }

      return {
        id: generateId(),
        company: product.brand || `Company ${product.id}`,
        role: product.title || 'Software Engineer',
        location: index % 2 === 0 ? 'Remote' : 'On-site',
        salary: product.price ? product.price * 1000 : 90000,
        platform: randomPlatform,
        status: randomStatus,
        appliedDate: appliedDate.toISOString().split('T')[0],
        interviewDate: interviewDate ? interviewDate.toISOString().split('T')[0] : '',
        notes: product.description || 'Mock application created from dummy data.',
        bookmarked: index % 3 === 0
      };
    });
    
    return mockJobs;
  } catch (error) {
    console.error('Error fetching dummy jobs:', error);
    return [];
  }
};
