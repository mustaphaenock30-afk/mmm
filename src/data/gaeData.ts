import { ProgramPillar, ProjectItem, NewsItem, TeamMember, ImpactStat } from '../types';

import gaeLogo3Img from '../assets/images/gae_logo_3_1786549275895.jpg';
import treePlantingImg from '../assets/images/gae_tree_planting_campaign_1786549292734.jpg';
import communityCleanupImg from '../assets/images/gae_community_cleanup_banner_1786549310880.jpg';
import treeNurseryImg from '../assets/images/gae_tree_nursery_site_1786549326614.jpg';
import schoolOutreachGroupImg from '../assets/images/gae_school_outreach_group_1786549344863.jpg';
import youthWorkshopAudienceImg from '../assets/images/gae_youth_workshop_audience_1786549361291.jpg';
import greenGhanaDelegationImg from '../assets/images/gae_green_ghana_delegation_1786549377412.jpg';
import streetSanitationSweeperImg from '../assets/images/gae_street_sanitation_sweeper_1786549395170.jpg';
import epaStakeholderSpeakerImg from '../assets/images/gae_epa_stakeholder_speaker_1786549414550.jpg';

export const GAE_IMAGES = {
  logo: gaeLogo3Img,
  treePlanting: treePlantingImg,
  communityCleanup: communityCleanupImg,
  treeNursery: treeNurseryImg,
  schoolOutreach: schoolOutreachGroupImg,
  youthWorkshop: youthWorkshopAudienceImg,
  greenGhanaDelegation: greenGhanaDelegationImg,
  streetSanitationSweeper: streetSanitationSweeperImg,
  epaStakeholderSpeaker: epaStakeholderSpeakerImg,
};

export const GAE_INFO = {
  name: 'Global Alliance on Environment',
  acronym: 'GAE',
  tagline: 'Empowering Youth. Restoring Ecosystems. Securing Our Climate Future.',
  establishedDate: 'July 24, 2020',
  headquarters: 'Techiman, Bono East Region, Ghana, West Africa',
  email: 'globalalliance97@gmail.com',
  phone: '+233 24 123 4567',
  website: 'https://allianceonenv.org',
  registrationType: 'Registered Non-Governmental Organization (NGO)',
  mission: 'To promote the protection and conservation of the environment by empowering the youth to lead in action-oriented environmental projects.',
  vision: 'To protect, restore, and enhance environmental quality for public health, environmental integrity, and economic viability across West Africa and globally.',
  coreValues: [
    { title: 'Sustainability', desc: 'Promoting long-term ecological balance and stewardship for future generations.' },
    { title: 'Earth Community Respect', desc: 'Honoring all living beings and natural ecosystems as interconnected life support systems.' },
    { title: 'Self-Reliance', desc: 'Building local community capacity to independently manage and protect natural resources.' },
    { title: 'Cooperation & Partnership', desc: 'Fostering multi-stakeholder collaboration with schools, traditional leaders, and civil society.' },
    { title: 'Accountability & Integrity', desc: 'Upholding transparent governance, measurable project impact, and public trust.' },
    { title: 'Diversity & Inclusivity', desc: 'Ensuring youth, women, and marginalized rural voices actively shape climate solutions.' },
    { title: 'Action-Oriented Optimism', desc: 'Driving practical, positive change with energy, hope, and grassroots enthusiasm.' }
  ]
};

export const IMPACT_STATS: ImpactStat[] = [
  {
    label: 'Trees Planted',
    value: 58500,
    unit: '+',
    icon: 'Trees',
    description: 'Native mahogany, acacia, and fruit trees planted in transitional forests and degraded farmland.'
  },
  {
    label: 'Youth Empowered',
    value: 14200,
    unit: '+',
    icon: 'GraduationCap',
    description: 'Students and young leaders trained through school environmental clubs and climate workshops.'
  },
  {
    label: 'Schools Reached',
    value: 38,
    unit: ' Schools',
    icon: 'School',
    description: 'Junior & Senior High Schools partnered with in Techiman and surrounding Bono East districts.'
  },
  {
    label: 'Restored Land',
    value: 420,
    unit: ' Hectares',
    icon: 'Mountain',
    description: 'Degraded community land and riverbanks rehabilitated through agroforestry and soil conservation.'
  }
];

export const PROGRAM_PILLARS: ProgramPillar[] = [
  {
    id: 'afforestation',
    title: 'Afforestation & Reforestation',
    category: 'Ecosystem Restoration',
    shortDesc: 'Restoring degraded forests and savannah transition zones through community-led tree planting drives.',
    fullDesc: 'GAE operates seedling nurseries in Techiman to grow indigenous and fast-growing shade trees. We collaborate with local farmers, chiefs, and youth groups to reforest depleted river basins, school compounds, and community parklands.',
    iconName: 'Trees',
    keyActivities: [
      'Community Tree Seedling Nurseries',
      'Riparian Riverbank Buffer Planting',
      'Agroforestry with Local Farmers',
      'Annual Green Ghana Youth Tree Drives'
    ],
    sdgGoals: ['SDG 13: Climate Action', 'SDG 15: Life on Land'],
    image: treePlantingImg
  },
  {
    id: 'education-outreach',
    title: 'Environmental Education Outreach',
    category: 'Youth Leadership',
    shortDesc: 'Inspiring climate literacy and practical environmental clubs across schools in Ghana.',
    fullDesc: 'Partnering with the Ghana Education Service (GES), GAE conducts interactive workshops on climate change, waste management, and conservation. Programs like the Bamiri L/A JHS initiative equip youth with practical skills to act as green ambassadors.',
    iconName: 'BookOpenCheck',
    keyActivities: [
      'School Environmental Club Formation',
      'Climate Change Workshops & Quizzes',
      'Student Seedling Care Competitions',
      'Teacher Capacity Training Toolkits'
    ],
    sdgGoals: ['SDG 4: Quality Education', 'SDG 13: Climate Action'],
    image: schoolOutreachGroupImg
  },
  {
    id: 'wildlife-conservation',
    title: 'Wildlife Conservation & Habitat Restoration',
    category: 'Biodiversity',
    shortDesc: 'Protecting endangered local species and preserving vital biodiversity corridors in the Bono East Region.',
    fullDesc: 'We campaign against illegal bush burning, deforestation, and habitat destruction. By protecting native flora and establishing green corridors, GAE safeguards local pollinators, birds, and small mammal populations.',
    iconName: 'Bird',
    keyActivities: [
      'Anti-Bushfire Prevention Patrols',
      'Pollinator Habitat Corridors',
      'Biodiversity Mapping Workshops',
      'Community Sacred Grove Preservation'
    ],
    sdgGoals: ['SDG 15: Life on Land'],
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: 'sustainable-agriculture',
    title: 'Sustainable Agriculture & Food Systems',
    category: 'Community Resilience',
    shortDesc: 'Promoting climate-smart farming, organic composting, and soil health for smallholder farming families.',
    fullDesc: 'Agriculture is the backbone of Techiman. GAE trains farmers in conservation tillage, mulching, organic pest control, and agroforestry to boost food yields while preventing soil erosion and drought vulnerability.',
    iconName: 'Sprout',
    keyActivities: [
      'Organic Composting Demonstration Sites',
      'Farmer Field Schools in Climate Resilience',
      'Soil Health & Erosion Control',
      'Drought-Resistant Crop Seed Sharing'
    ],
    sdgGoals: ['SDG 2: Zero Hunger', 'SDG 12: Responsible Consumption'],
    image: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb12765?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: 'clean-water-sanitation',
    title: 'Clean Water, Hygiene & Sanitation (WASH)',
    category: 'Public Health',
    shortDesc: 'Safeguarding freshwater sources, improving sanitation, and combatting air pollution.',
    fullDesc: 'Access to safe drinking water and clean air is essential for public health. GAE works to clear river pollution, install rain catchment systems in schools, and advocate against open burning of plastics.',
    iconName: 'Droplets',
    keyActivities: [
      'Stream & River Clean-Up Campaigns',
      'School Rainwater Harvesting Systems',
      'Plastic Waste Sorting & Upcycling',
      'Clean Air Awareness Drives'
    ],
    sdgGoals: ['SDG 6: Clean Water & Sanitation', 'SDG 3: Good Health'],
    image: 'https://images.unsplash.com/photo-1538300342682-cf57afb97285?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: 'land-restoration',
    title: 'Land Restoration & Community Resilience',
    category: 'Ecosystem Restoration',
    shortDesc: 'Reclaiming degraded mining and eroded farmlands to build disaster-resilient rural communities.',
    fullDesc: 'Land degradation severely impacts rural livelihoods in the transitional belt. GAE deploys bio-engineering techniques, vetiver grass planting, and terracing to stabilize vulnerable topsoil and restore productivity.',
    iconName: 'ShieldCheck',
    keyActivities: [
      'Gully Erosion Stabilization',
      'Vetiver Grass Barrier Planting',
      'Disaster Risk Reduction Training',
      'Community Tree Canopy Mapping'
    ],
    sdgGoals: ['SDG 15: Life on Land', 'SDG 11: Sustainable Communities'],
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1000'
  }
];

export const PROJECTS: ProjectItem[] = [
  {
    id: 'project-bamiri-climate',
    title: 'Bamiri JHS Climate & Tree Canopy Empowerment',
    category: 'Education',
    location: 'Techiman South District, Ghana',
    status: 'Active',
    summary: 'Comprehensive climate change education, student mentorship, and schoolyard tree planting drive at Bamiri L/A Junior High School.',
    impactMetric: '450 Students Trained & 350 Shade Trees Growing',
    treesPlanted: 350,
    peopleImpacted: 450,
    startDate: 'October 2024',
    image: youthWorkshopAudienceImg,
    highlights: [
      'Trained JHS students on weather vs climate distinctions and adaptation methods.',
      'Established student-led Green Care Teams to nurture planted saplings.',
      'Equipped school library with climate resource booklets in partnership with GES.'
    ]
  },
  {
    id: 'project-techiman-reforest',
    title: 'Techiman River Basin Buffer Zone Restoration',
    category: 'Reforestation',
    location: 'Bono East Region, Ghana',
    status: 'Active',
    summary: 'Restoring degraded riverbank corridors along local streams feeding the Tano river basin to prevent siltation and maintain clean water.',
    impactMetric: '18,500 Native Saplings Planted along 12km Riverbanks',
    treesPlanted: 18500,
    peopleImpacted: 8200,
    startDate: 'March 2023',
    image: treePlantingImg,
    highlights: [
      'Planted native teak, mahogany, and bamboo along vulnerable waterbanks.',
      'Reduced seasonal topsoil runoff by an estimated 35%.',
      'Engaged 120 youth volunteers in nursery potting and weekend planting.'
    ]
  },
  {
    id: 'project-agroforestry-farmers',
    title: 'Green Farmers Agroforestry Network',
    category: 'Agriculture',
    location: 'Techiman Rural Communities',
    status: 'Expanding',
    summary: 'Integrating nitrogen-fixing trees into maize and yam farms to enrich soil health and provide shade without synthetic chemical fertilizers.',
    impactMetric: '220 Smallholder Farmers Enrolled Across 15 Villages',
    treesPlanted: 12000,
    peopleImpacted: 1800,
    startDate: 'January 2022',
    image: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb12765?auto=format&fit=crop&q=80&w=1000',
    highlights: [
      'Provided free moringa, acacia, and avocado seedlings to enrolled farm families.',
      'Increased crop yield stability during unexpected dry spell weeks.',
      'Created secondary income stream for women selling nursery saplings.'
    ]
  },
  {
    id: 'project-school-rainharvest',
    title: 'School Clean Water & Rain Catchment Initiative',
    category: 'Clean Water',
    location: 'Techiman Municipal District',
    status: 'Completed',
    summary: 'Installing 5,000L rainwater harvesting tanks and filtration systems at rural primary schools to ensure hygienic handwashing and drinking water.',
    impactMetric: '12 School Rain Harvesting Systems Installed',
    treesPlanted: 0,
    peopleImpacted: 4800,
    startDate: 'June 2021',
    image: 'https://images.unsplash.com/photo-1538300342682-cf57afb97285?auto=format&fit=crop&q=80&w=1000',
    highlights: [
      'Provided 100% clean water access during dry season months for students.',
      'Dramatically reduced waterborne illness absenteeism among primary pupils.',
      'Established school WASH committees to maintain filtration tanks.'
    ]
  }
];

export const NEWS_ARTICLES: NewsItem[] = [
  {
    id: 'news-bamiri-oct2024',
    title: 'GAE Educates Bamiri L/A JHS Students on Climate Change and Youth Leadership',
    category: 'School Outreach',
    date: 'October 28, 2024',
    author: 'Michael Mustapha',
    readTime: '4 min read',
    summary: 'Global Alliance on Environment conducted an intensive climate education session in Techiman to equip pupils with hands-on adaptation knowledge and environmental stewardship skills.',
    content: `In an era where climate change poses severe threats to agriculture and ecosystems in West Africa, Global Alliance on Environment (GAE) took a decisive step forward at Bamiri L/A Junior High School in Techiman South District.

Led by GAE Executive Directors and youth mentors, the interactive workshop engaged over 400 pupils in understanding key climate concepts, including the difference between daily weather variations and long-term climate trends, greenhouse gas effects, and practical ways young people can protect local forests.

"Youth are not just passive observers of environmental degradation; they are the most effective champions of change when given knowledge and practical tools," remarked Enock Mustapha, CEO of GAE. The session concluded with students establishing an active Environmental Club and planting 50 shade trees across the school premises.`,
    image: youthWorkshopAudienceImg,
    tags: ['Youth Outreach', 'Techiman', 'GES', 'Climate Education']
  },
  {
    id: 'news-green-ghana-2024',
    title: 'GAE Mobilizes Youth Volunteers to Plant 15,000 Trees in Bono East Region',
    category: 'Reforestation',
    date: 'June 14, 2024',
    author: 'Enock Mustapha',
    readTime: '5 min read',
    summary: 'Joining national reforestation efforts, GAE mobilized hundreds of young people in Techiman to restore depleted forest reserves and rural riverbank zones.',
    content: `The Global Alliance on Environment successfully spearheaded a major tree planting campaign across the Techiman municipal area as part of national greening efforts. Volunteers from secondary schools, youth groups, and local farming cooperatives assembled early in the morning to distribute native tree seedlings raised in GAE community nurseries.

Over 15,000 saplings—including mahogany, cashew, and acacia species—were planted in degraded transitional forest pockets and farm boundaries. The project incorporates a 2-year monitoring protocol where assigned youth stewards conduct regular weeding and watering checks during dry spells.`,
    image: greenGhanaDelegationImg,
    tags: ['Reforestation', 'Green Ghana', 'Bono East', 'Youth Action']
  },
  {
    id: 'news-lean-synergy',
    title: 'Aligning Grassroots Conservation with Regional Climate Resilience Projects',
    category: 'Partnerships',
    date: 'March 10, 2024',
    author: 'Yong Osman',
    readTime: '6 min read',
    summary: 'How GAE collaborates with regional stakeholders, traditional authorities, and civil society to protect Ghana transition zone biodiversity.',
    content: `The transitional zone of Ghana, centered around Techiman, is a crucial ecological bridge between dense high forest and savannah biomes. GAE continues to work alongside community leaders, district assemblies, and conservation partners to combat land degradation, wild bushfires, and illegal deforestation.

Through community sensitization meetings and radio broadcasts, GAE advocates for bushfire prevention bylaws during the harmattan season and promotes sustainable agroforestry among smallholder farmers.`,
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1000',
    tags: ['Conservation', 'Community Leadership', 'Policy', 'Biodiversity']
  }
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'michael-mustapha',
    name: 'Michael Mustapha',
    role: 'Founder & Chairman',
    bio: 'Passionate environmental activist and community strategist who founded Global Alliance on Environment in July 2020 to champion youth-led conservation across Ghana.',
    location: 'Techiman, Bono East Region, Ghana',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=500',
    email: 'michael@allianceonenv.org'
  },
  {
    id: 'enock-mustapha',
    name: 'Enock Mustapha',
    role: 'Chief Executive Officer (CEO)',
    bio: 'Leads day-to-day operations, strategic partnerships, youth outreach programs, and field project deployment across Techiman and West Africa.',
    location: 'Techiman, Bono East Region, Ghana',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=500',
    email: 'globalalliance97@gmail.com'
  },
  {
    id: 'yong-osman',
    name: 'Yong Osman',
    role: 'Director of Programs & Field Operations',
    bio: 'Oversees tree nursery production, agricultural training, and field monitoring to guarantee high seedling survival rates and community engagement.',
    location: 'Techiman, Bono East Region, Ghana',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=500',
    email: 'osman@allianceonenv.org'
  }
];

export const CLIMATE_QUIZ_QUESTIONS = [
  {
    id: 1,
    question: 'What is the main difference between weather and climate?',
    options: [
      'Weather is about rain; climate is only about temperature.',
      'Weather refers to short-term daily conditions; climate refers to long-term average atmospheric patterns over 30+ years.',
      'Weather occurs only in winter; climate occurs in summer.',
      'There is no difference between weather and climate.'
    ],
    correctIndex: 1,
    explanation: 'Correct! Weather changes day-to-day, while climate represents long-term statistical weather trends over decades.'
  },
  {
    id: 2,
    question: 'How do trees help combat global climate change?',
    options: [
      'Trees absorb carbon dioxide (CO2) from the atmosphere during photosynthesis and release oxygen.',
      'Trees generate electricity from sunlight.',
      'Trees stop wind from blowing globally.',
      'Trees heat up the atmosphere.'
    ],
    correctIndex: 0,
    explanation: 'Exactly! Trees act as natural carbon sinks, pulling greenhouse gases out of the air and storing carbon in their wood and soil.'
  },
  {
    id: 3,
    question: 'When was Global Alliance on Environment (GAE) established in Techiman, Ghana?',
    options: [
      'January 1, 2015',
      'July 24, 2020',
      'December 15, 2022',
      'March 10, 2018'
    ],
    correctIndex: 1,
    explanation: 'Spot on! GAE was officially established on July 24, 2020, to empower youth in action-oriented environmental projects.'
  },
  {
    id: 4,
    question: 'What is agroforestry?',
    options: [
      'Cutting down forests to build cities.',
      'An agricultural method that integrates trees with crops and livestock to improve soil health and farm resilience.',
      'Growing trees inside indoor glass houses only.',
      'Using plastic trees on farms.'
    ],
    correctIndex: 1,
    explanation: 'Correct! Agroforestry combines agriculture and forestry to increase food security while protecting topsoil and moisture.'
  }
];
