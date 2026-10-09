import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  TabType,
  ServiceDocKey,
  PuskesmasProfile,
  StatisticItem,
  IslandFacility,
  HealthService,
  ILPCluster,
  ServiceSchedule,
  NewsItem,
  AgendaEvent,
  HealthArticle,
  DocumentItem,
  FaqItem
} from '../types';
import {
  initialProfile,
  initialStatistics,
  initialIslands,
  initialILPClusters,
  initialHealthServices,
  initialSchedules,
  initialNews,
  initialAgenda,
  initialHealthArticles,
  initialDocuments,
  initialFaqs
} from '../data/initialData';

interface DataContextType {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  profileSubTab: 'sambutan' | 'visimisi' | 'struktur' | 'profil' | 'wilayah' | 'fasilitas';
  setProfileSubTab: React.Dispatch<React.SetStateAction<'sambutan' | 'visimisi' | 'struktur' | 'profil' | 'wilayah' | 'fasilitas'>>;
  activeServiceDoc: ServiceDocKey | null;
  setActiveServiceDoc: React.Dispatch<React.SetStateAction<ServiceDocKey | null>>;
  openServiceDoc: (doc: ServiceDocKey) => void;
  closeServiceDoc: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  selectedClusterId: string | null;
  setSelectedClusterId: (id: string | null) => void;
  selectedIslandId: string | null;
  setSelectedIslandId: (id: string | null) => void;
  
  // Data States
  profile: PuskesmasProfile;
  setProfile: React.Dispatch<React.SetStateAction<PuskesmasProfile>>;
  statistics: StatisticItem[];
  setStatistics: React.Dispatch<React.SetStateAction<StatisticItem[]>>;
  islands: IslandFacility[];
  setIslands: React.Dispatch<React.SetStateAction<IslandFacility[]>>;
  ilpClusters: ILPCluster[];
  setIlpClusters: React.Dispatch<React.SetStateAction<ILPCluster[]>>;
  healthServices: HealthService[];
  setHealthServices: React.Dispatch<React.SetStateAction<HealthService[]>>;
  schedules: ServiceSchedule[];
  setSchedules: React.Dispatch<React.SetStateAction<ServiceSchedule[]>>;
  news: NewsItem[];
  setNews: React.Dispatch<React.SetStateAction<NewsItem[]>>;
  agenda: AgendaEvent[];
  setAgenda: React.Dispatch<React.SetStateAction<AgendaEvent[]>>;
  articles: HealthArticle[];
  setArticles: React.Dispatch<React.SetStateAction<HealthArticle[]>>;
  documents: DocumentItem[];
  setDocuments: React.Dispatch<React.SetStateAction<DocumentItem[]>>;
  faqs: FaqItem[];
  setFaqs: React.Dispatch<React.SetStateAction<FaqItem[]>>;

  // Admin Authentication State
  isAdminAuthenticated: boolean;
  setIsAdminAuthenticated: (auth: boolean) => void;

  // Updater actions for Admin Dashboard
  updateProfile: (partial: Partial<PuskesmasProfile>) => void;
  updateHealthServices: (services: HealthService[]) => void;
  updateIlpClusters: (clusters: ILPCluster[]) => void;
  updateNews: (items: NewsItem[]) => void;
  updateAgenda: (items: AgendaEvent[]) => void;
  updateSchedules: (items: ServiceSchedule[]) => void;
  updateIslands: (items: IslandFacility[]) => void;
  updateDocuments: (items: DocumentItem[]) => void;
  updateFaqs: (items: FaqItem[]) => void;
  updateStatistics: (stats: StatisticItem[]) => void;
  updateArticles: (items: HealthArticle[]) => void;
  resetToInitialData: () => void;

  // Helper actions
  resetToDefaults: () => void;
  exportDataJSON: () => void;
  navigateToTab: (tab: TabType, targetId?: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'puskesmas_seribu_selatan_data_v2';

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<TabType>('beranda');
  const [profileSubTab, setProfileSubTab] = useState<'sambutan' | 'visimisi' | 'struktur' | 'profil' | 'wilayah' | 'fasilitas'>('sambutan');
  const [activeServiceDoc, setActiveServiceDoc] = useState<ServiceDocKey | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [selectedClusterId, setSelectedClusterId] = useState<string | null>(null);
  const [selectedIslandId, setSelectedIslandId] = useState<string | null>(null);

  const openServiceDoc = (doc: ServiceDocKey) => {
    setActiveServiceDoc(doc);
  };

  const closeServiceDoc = () => {
    setActiveServiceDoc(null);
  };

  // Initialize data with local storage fallback
  const loadSavedData = () => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Failed to parse saved data from localStorage', e);
    }
    return null;
  };

  const savedData = loadSavedData();

  const [profile, setProfile] = useState<PuskesmasProfile>(savedData?.profile || initialProfile);
  const [statistics, setStatistics] = useState<StatisticItem[]>(savedData?.statistics || initialStatistics);
  const [islands, setIslands] = useState<IslandFacility[]>(savedData?.islands || initialIslands);
  const [ilpClusters, setIlpClusters] = useState<ILPCluster[]>(savedData?.ilpClusters || initialILPClusters);
  const [healthServices, setHealthServices] = useState<HealthService[]>(savedData?.healthServices || initialHealthServices);
  const [schedules, setSchedules] = useState<ServiceSchedule[]>(savedData?.schedules || initialSchedules);
  const [news, setNews] = useState<NewsItem[]>(savedData?.news || initialNews);
  const [agenda, setAgenda] = useState<AgendaEvent[]>(savedData?.agenda || initialAgenda);
  const [articles, setArticles] = useState<HealthArticle[]>(savedData?.articles || initialHealthArticles);
  const [documents, setDocuments] = useState<DocumentItem[]>(savedData?.documents || initialDocuments);
  const [faqs, setFaqs] = useState<FaqItem[]>(savedData?.faqs || initialFaqs);

  // Admin Authentication State (saved in sessionStorage so it persists across tab clicks)
  const [isAdminAuthenticated, setIsAdminAuthenticatedState] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem('puskesmas_admin_logged_in') === 'true';
    } catch {
      return false;
    }
  });

  const setIsAdminAuthenticated = (auth: boolean) => {
    setIsAdminAuthenticatedState(auth);
    try {
      if (auth) {
        sessionStorage.setItem('puskesmas_admin_logged_in', 'true');
      } else {
        sessionStorage.removeItem('puskesmas_admin_logged_in');
      }
    } catch (e) {
      console.warn('Session storage error:', e);
    }
  };

  // Updater actions for Admin Dashboard
  const updateProfile = (partial: Partial<PuskesmasProfile>) => {
    setProfile(prev => ({ ...prev, ...partial }));
  };

  const updateHealthServices = (services: HealthService[]) => {
    setHealthServices(services);
  };

  const updateIlpClusters = (clusters: ILPCluster[]) => {
    setIlpClusters(clusters);
  };

  const updateNews = (items: NewsItem[]) => {
    setNews(items);
  };

  const updateAgenda = (events: AgendaEvent[]) => {
    setAgenda(events);
  };

  const updateSchedules = (items: ServiceSchedule[]) => {
    setSchedules(items);
  };

  const updateIslands = (items: IslandFacility[]) => {
    setIslands(items);
  };

  const updateDocuments = (items: DocumentItem[]) => {
    setDocuments(items);
  };

  const updateFaqs = (items: FaqItem[]) => {
    setFaqs(items);
  };

  const updateStatistics = (stats: StatisticItem[]) => {
    setStatistics(stats);
  };

  const updateArticles = (items: HealthArticle[]) => {
    setArticles(items);
  };

  const resetToInitialData = () => {
    resetToDefaults();
  };

  // Save to localStorage when states change
  useEffect(() => {
    try {
      const payload = {
        profile,
        statistics,
        islands,
        ilpClusters,
        healthServices,
        schedules,
        news,
        agenda,
        articles,
        documents,
        faqs
      };
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(payload));
    } catch (e) {
      console.error('Error saving data to localStorage', e);
    }
  }, [profile, statistics, islands, ilpClusters, healthServices, schedules, news, agenda, articles, documents, faqs]);

  const resetToDefaults = () => {
    if (window.confirm('Kembalikan semua data ke pengaturan awal puskesmas?')) {
      setProfile(initialProfile);
      setStatistics(initialStatistics);
      setIslands(initialIslands);
      setIlpClusters(initialILPClusters);
      setHealthServices(initialHealthServices);
      setSchedules(initialSchedules);
      setNews(initialNews);
      setAgenda(initialAgenda);
      setArticles(initialHealthArticles);
      setDocuments(initialDocuments);
      setFaqs(initialFaqs);
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    }
  };

  const exportDataJSON = () => {
    const payload = {
      profile,
      statistics,
      islands,
      ilpClusters,
      healthServices,
      schedules,
      news,
      agenda,
      articles,
      documents,
      faqs,
      exportedAt: new Date().toISOString()
    };
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(payload, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `data_puskesmas_seribu_selatan_${new Date().toISOString().slice(0,10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const navigateToTab = (tab: TabType, targetId?: string) => {
    if (tab === 'sambutan') {
      setActiveTab('profil');
      setProfileSubTab('sambutan');
    } else if (tab === 'dokumen-pelayanan') {
      setActiveTab('pelayanan');
      if (targetId && ['standar', 'maklumat', 'hak-kewajiban', 'struktur-ilp'].includes(targetId)) {
        setActiveServiceDoc(targetId as ServiceDocKey);
      } else {
        setActiveServiceDoc('standar');
      }
    } else {
      setActiveTab(tab);
      if (tab === 'profil' && targetId) {
        if (['sambutan', 'visimisi', 'struktur', 'profil', 'wilayah', 'fasilitas'].includes(targetId)) {
          setProfileSubTab(targetId as any);
        }
      }
    }
    if (tab === 'ilp' && targetId) {
      setSelectedClusterId(targetId);
    } else if (tab === 'wilayah' && targetId) {
      setSelectedIslandId(targetId);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <DataContext.Provider
      value={{
        activeTab,
        setActiveTab,
        profileSubTab,
        setProfileSubTab,
        activeServiceDoc,
        setActiveServiceDoc,
        openServiceDoc,
        closeServiceDoc,
        searchQuery,
        setSearchQuery,
        isSearchOpen,
        setIsSearchOpen,
        selectedClusterId,
        setSelectedClusterId,
        selectedIslandId,
        setSelectedIslandId,
        profile,
        setProfile,
        statistics,
        setStatistics,
        islands,
        setIslands,
        ilpClusters,
        setIlpClusters,
        healthServices,
        setHealthServices,
        schedules,
        setSchedules,
        news,
        setNews,
        agenda,
        setAgenda,
        articles,
        setArticles,
        documents,
        setDocuments,
        faqs,
        setFaqs,
        isAdminAuthenticated,
        setIsAdminAuthenticated,
        updateProfile,
        updateHealthServices,
        updateIlpClusters,
        updateNews,
        updateAgenda,
        updateSchedules,
        updateIslands,
        updateDocuments,
        updateFaqs,
        updateStatistics,
        updateArticles,
        resetToInitialData,
        resetToDefaults,
        exportDataJSON,
        navigateToTab
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
