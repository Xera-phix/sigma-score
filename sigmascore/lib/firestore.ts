import { 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  collection, 
  query, 
  orderBy, 
  limit, 
  getDocs,
  addDoc,
  serverTimestamp 
} from "firebase/firestore";
import { db } from "./firebase";

// User data interface
export interface UserData {
  uid: string;
  email: string;
  firstName: string;
  lastName: string;
  displayName: string;
  sigmaScore: number;
  ranking: number;
  totalScans: number;
  createdAt: Date;
  lastLoginAt: Date;
  isActive: boolean;
  profileCompleted: boolean;
}

// Scan data interface
export interface ScanData {
  id?: string;
  userId: string;
  text: string;
  sigmaScore: number;
  timestamp: Date;
  analysis: {
    sentiment: string;
    confidence: number;
    keywords: string[];
    aiScore?: number;
    sigmaLevel?: string;
    faceScores?: {
      chiseledJawline: number;
      hunterEyes: number;
      chinLength: number;
      pursedLips: number;
      gonialAngle: number;
      highCheekbones: number;
      thickEyebrows: number;
      healthySigmaHair: number;
      clearSkin: number;
    };
    bodyScores?: {
      broadShoulders: number;
      taperedWaist: number;
      posture: number;
      heightAndProportions: number;
      lowBodyFatAndMuscular: number;
    };
  };
}

// Get user data from Firestore
export const getUserData = async (uid: string): Promise<UserData | null> => {
  try {
    const userDoc = await getDoc(doc(db, "users", uid));
    if (userDoc.exists()) {
      return userDoc.data() as UserData;
    }
    return null;
  } catch (error) {
    console.error("Error getting user data:", error);
    return null;
  }
};

// Update user's sigma score
export const updateUserSigmaScore = async (uid: string, newScore: number) => {
  try {
    const userRef = doc(db, "users", uid);
    await updateDoc(userRef, {
      sigmaScore: newScore,
      lastLoginAt: new Date()
    });
  } catch (error) {
    console.error("Error updating sigma score:", error);
    throw error;
  }
};

// Save a new scan
export const saveScan = async (scanData: Omit<ScanData, 'id'>) => {
  try {
    const scanRef = await addDoc(collection(db, "scans"), {
      ...scanData,
      timestamp: serverTimestamp()
    });
    return scanRef.id;
  } catch (error) {
    console.error("Error saving scan:", error);
    throw error;
  }
};

// Get leaderboard data
export const getLeaderboard = async (limitCount: number = 10) => {
  try {
    const leaderboardQuery = query(
      collection(db, "users"),
      orderBy("sigmaScore", "desc"),
      limit(limitCount)
    );
    const querySnapshot = await getDocs(leaderboardQuery);
    return querySnapshot.docs.map((doc, index) => ({
      id: doc.id,
      rank: index + 1,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Error getting leaderboard:", error);
    return [];
  }
};

// Update all user rankings based on current sigma scores
export const updateAllRankings = async () => {
  try {
    const allUsersQuery = query(
      collection(db, "users"),
      orderBy("sigmaScore", "desc")
    );
    const querySnapshot = await getDocs(allUsersQuery);
    
    const updatePromises = querySnapshot.docs.map((docSnapshot, index) => {
      const userRef = doc(db, "users", docSnapshot.id);
      return updateDoc(userRef, {
        ranking: index + 1
      });
    });
    
    await Promise.all(updatePromises);
    console.log("All user rankings updated successfully");
  } catch (error) {
    console.error("Error updating all rankings:", error);
    throw error;
  }
};

// Get user's current rank
export const getUserRank = async (uid: string): Promise<number> => {
  try {
    const userData = await getUserData(uid);
    if (!userData) return 0;
    
    const allUsersQuery = query(
      collection(db, "users"),
      orderBy("sigmaScore", "desc")
    );
    const querySnapshot = await getDocs(allUsersQuery);
    
    const userIndex = querySnapshot.docs.findIndex(doc => doc.id === uid);
    return userIndex >= 0 ? userIndex + 1 : 0;
  } catch (error) {
    console.error("Error getting user rank:", error);
    return 0;
  }
};

// Update user ranking
export const updateUserRanking = async (uid: string, ranking: number) => {
  try {
    const userRef = doc(db, "users", uid);
    await updateDoc(userRef, {
      ranking: ranking
    });
  } catch (error) {
    console.error("Error updating ranking:", error);
    throw error;
  }
};

// Calculate sigma score from AI analysis
export const calculateSigmaScore = (analysis: {
  overallSigmaScore: number;
  faceScores: Record<string, number>;
  bodyScores?: Record<string, number>;
}): number => {
  const aiScore = analysis.overallSigmaScore;
  const faceValues = Object.values(analysis.faceScores) as number[];
  const faceScore = faceValues.reduce((a, b) => a + b, 0) / faceValues.length;
  
  let bodyScore = 0;
  if (analysis.bodyScores) {
    const bodyValues = Object.values(analysis.bodyScores) as number[];
    bodyScore = bodyValues.reduce((a, b) => a + b, 0) / bodyValues.length;
  }

  // Weight the scores: 60% AI overall score, 25% face average, 15% body average (if available)
  const weightedScore = aiScore * 0.6 + faceScore * 0.25 + (bodyScore * 0.15);
  
  // Return the current sigma score (0-100 range)
  return Math.floor(weightedScore);
};

// Create sample leaderboard data for testing (only if no users exist)
export const createSampleLeaderboardData = async () => {
  try {
    const existingUsers = await getLeaderboard(1);
    if (existingUsers.length > 0) {
      console.log('Users already exist, skipping sample data creation');
      return;
    }

    console.log('Creating sample leaderboard data...');
    const sampleUsers = [
      {
        uid: 'sample-1',
        email: 'gigachad@sigma.com',
        firstName: 'Giga',
        lastName: 'Chad',
        displayName: 'GigaChad',
        sigmaScore: 95,
        ranking: 1,
        totalScans: 15,
        createdAt: new Date(),
        lastLoginAt: new Date(),
        isActive: true,
        profileCompleted: true
      },
      {
        uid: 'sample-2',
        email: 'sigma@elite.com',
        firstName: 'Sigma',
        lastName: 'Elite',
        displayName: 'SigmaElite',
        sigmaScore: 87,
        ranking: 2,
        totalScans: 12,
        createdAt: new Date(),
        lastLoginAt: new Date(),
        isActive: true,
        profileCompleted: true
      },
      {
        uid: 'sample-3',
        email: 'alpha@wolf.com',
        firstName: 'Alpha',
        lastName: 'Wolf',
        displayName: 'AlphaWolf',
        sigmaScore: 78,
        ranking: 3,
        totalScans: 8,
        createdAt: new Date(),
        lastLoginAt: new Date(),
        isActive: true,
        profileCompleted: true
      }
    ];

    for (const userData of sampleUsers) {
      await setDoc(doc(db, "users", userData.uid), userData);
    }
    
    console.log('Sample leaderboard data created successfully');
  } catch (error) {
    console.error('Error creating sample data:', error);
  }
}; 