import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GAE_INFO } from '../data/gaeData';
import {
  MapPin,
  Upload,
  ArrowRight,
  CheckCircle2,
  X,
  Maximize2,
  Loader2,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';

export type GalleryCategory =
  | 'Field Operations'
  | 'Conservation Programs'
  | 'Leadership & Identity';

export interface GalleryItem {
  id: string;
  driveUrl: string;
  title: string;
  category: GalleryCategory;
  location: string;
  description: string;
  fit?: 'cover' | 'contain';
}

/**
 * Converts a Google Drive file sharing link (`https://drive.google.com/file/d/<ID>/view?usp=sharing`)
 * into a direct embeddable Google Drive CDN image URL suitable for `<img src="...">`.
 */
export function getGoogleDriveImageSrc(driveShareUrl: string, width = 1000): string {
  const match = driveShareUrl.match(/\/file\/d\/([^/]+)/);
  if (!match || !match[1]) return driveShareUrl;
  return `https://lh3.googleusercontent.com/d/${match[1]}=w${width}`;
}

export function getGoogleDriveFallbackSrc(driveShareUrl: string, width = 1000): string {
  const match = driveShareUrl.match(/\/file\/d\/([^/]+)/);
  if (!match || !match[1]) return driveShareUrl;
  return `https://drive.google.com/thumbnail?id=${match[1]}&sz=w${width}`;
}

export const GOOGLE_DRIVE_GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'drive-01',
    driveUrl: 'https://drive.google.com/file/d/1-8hIsu9wxXDIWq1c8QSBC7unzZSdOiGB/view?usp=sharing',
    title: 'Community Field Archive — Record 24',
    category: 'Field Operations',
    location: 'Techiman & Bono East Region, Ghana',
    description: 'On-the-ground community conservation and youth environmental stewardship activities led by GAE.',
  },
  {
    id: 'drive-02',
    driveUrl: 'https://drive.google.com/file/d/1-IdZm3x7Yar55h-sLRJ1UWD_Og3onl-E/view?usp=sharing',
    title: 'Afforestation & Indigenous Tree Planting',
    category: 'Conservation Programs',
    location: 'Techiman Forest Transition Zone, Ghana',
    description: 'Community-led afforestation campaign restoring degraded landscapes and tree cover across Bono East.',
  },
  {
    id: 'drive-03',
    driveUrl: 'https://drive.google.com/file/d/12yQ6scyuO6XOKW8N6zrtIjGHADw0UhPr/view?usp=sharing',
    title: 'Executive Directorate — Field Supervision',
    category: 'Leadership & Identity',
    location: 'Techiman Secretariat, Ghana',
    description: 'GAE executive leadership coordinating regional conservation partnerships and grassroots programs.',
  },
  {
    id: 'drive-04',
    driveUrl: 'https://drive.google.com/file/d/14TJBu30BWCxrQjdpw1U5zJJQF7_hajTq/view?usp=sharing',
    title: 'Technical & Environmental Engineering Desk',
    category: 'Leadership & Identity',
    location: 'Techiman, Bono East Region, Ghana',
    description: 'Technical field assessment and environmental project coordination for community resilience initiatives.',
  },
  {
    id: 'drive-05',
    driveUrl: 'https://drive.google.com/file/d/180Oa8WXck4Z4y-OZjU4_ernAcH4wolde/view?usp=sharing',
    title: 'Youth Capacity Building & Climate Leadership',
    category: 'Conservation Programs',
    location: 'Techiman Municipal District, Ghana',
    description: 'Training students, youth volunteers, and local stewards in practical environmental action.',
  },
  {
    id: 'drive-06',
    driveUrl: 'https://drive.google.com/file/d/18eiSo5CjhpvmJEE_MW7mfiz7R6eNs5Wo/view?usp=sharing',
    title: 'Sustainable Agriculture & Agroforestry',
    category: 'Conservation Programs',
    location: 'Techiman Rural Farming Communities, Ghana',
    description: 'Supporting smallholder farmers with climate-smart agroforestry, soil health, and tree integration.',
  },
  {
    id: 'drive-07',
    driveUrl: 'https://drive.google.com/file/d/198CBkYtDXgT_xr0xDm0mEQPx-H09Ht6U/view?usp=sharing',
    title: 'Community Field Archive — Record 01',
    category: 'Field Operations',
    location: 'Techiman & Bono East Region, Ghana',
    description: 'Photographic field documentation from Global Alliance on Environment grassroots deployments.',
  },
  {
    id: 'drive-08',
    driveUrl: 'https://drive.google.com/file/d/19PsM3ViS4y9eZnnUISQCJ-txPkDLiAZZ/view?usp=sharing',
    title: 'Global Alliance on Environment Official Emblem',
    category: 'Leadership & Identity',
    location: 'Techiman Headquarters, Ghana',
    description: 'Official organizational insignia representing GAE conservation and youth empowerment across Ghana.',
    fit: 'contain',
  },
  {
    id: 'drive-09',
    driveUrl: 'https://drive.google.com/file/d/19nM7geupO7A9wiDqXa9dcYx8aQ2oY7dZ/view?usp=sharing',
    title: 'Community Field Archive — Record 36',
    category: 'Field Operations',
    location: 'Techiman & Bono East Region, Ghana',
    description: 'Field documentation of community outreach, tree care, and environmental protection activities.',
  },
  {
    id: 'drive-10',
    driveUrl: 'https://drive.google.com/file/d/19zv_bQGdRVGOIdljAFG4linlZSik9pZh/view?usp=sharing',
    title: 'Community Field Archive — Record 03',
    category: 'Field Operations',
    location: 'Techiman & Bono East Region, Ghana',
    description: 'Grassroots mobilization and environmental stewardship recorded during GAE field operations.',
  },
  {
    id: 'drive-11',
    driveUrl: 'https://drive.google.com/file/d/1EeyLLhiQVetVwg2Hy4fKSvlo4BzcXu_9/view?usp=sharing',
    title: 'Community Field Archive — Record 27',
    category: 'Field Operations',
    location: 'Techiman & Bono East Region, Ghana',
    description: 'Youth and community participants engaged in regional environmental restoration exercises.',
  },
  {
    id: 'drive-12',
    driveUrl: 'https://drive.google.com/file/d/1FKBR5CA7L3XI6nd78tNLWUv3JaMBq2Bt/view?usp=sharing',
    title: 'Founding Leadership — Global Alliance on Environment',
    category: 'Leadership & Identity',
    location: 'Techiman Secretariat, Ghana',
    description: 'Executive governance leadership championing youth-driven environmental protection since July 2020.',
  },
  {
    id: 'drive-13',
    driveUrl: 'https://drive.google.com/file/d/1FzirsYCooBVa2kXJIadtcrNyR5chIUTd/view?usp=sharing',
    title: 'Community Field Archive — Record 34',
    category: 'Field Operations',
    location: 'Techiman & Bono East Region, Ghana',
    description: 'Verified field photography from GAE community conservation and educational outreach.',
  },
  {
    id: 'drive-14',
    driveUrl: 'https://drive.google.com/file/d/1GMHt4hkzkRl27Ow6tQX0KR3IJj3cXBqY/view?usp=sharing',
    title: 'Climate Change Mitigation & Resilience',
    category: 'Conservation Programs',
    location: 'Bono East Region, Ghana',
    description: 'Action-oriented climate education and local adaptation initiatives across partner communities.',
  },
  {
    id: 'drive-15',
    driveUrl: 'https://drive.google.com/file/d/1Hem0Us00g6Ay4i5ovoxUdPS8mkh5Il5H/view?usp=sharing',
    title: 'Field Engineering & Project Operations',
    category: 'Leadership & Identity',
    location: 'Techiman, Bono East Region, Ghana',
    description: 'Planning and monitoring field infrastructure for land restoration and community WASH projects.',
  },
  {
    id: 'drive-16',
    driveUrl: 'https://drive.google.com/file/d/1JxhnUiDtIjMTml1PP193-ibBtmuqNf2v/view?usp=sharing',
    title: 'Clean Water, Hygiene & Watershed Protection',
    category: 'Conservation Programs',
    location: 'Techiman River Basins, Ghana',
    description: 'Safeguarding freshwater sources, riparian buffer zones, and community sanitation standards.',
  },
  {
    id: 'drive-17',
    driveUrl: 'https://drive.google.com/file/d/1NWL3-NL94GChDCxKSp46yvyfntXDkDIB/view?usp=sharing',
    title: 'Community Field Archive — Record 11',
    category: 'Field Operations',
    location: 'Techiman & Bono East Region, Ghana',
    description: 'On-site documentation of volunteer mobilization and local ecosystem restoration.',
  },
  {
    id: 'drive-18',
    driveUrl: 'https://drive.google.com/file/d/1OXlrqJPfte0T-AxNotXMDl0cmIeK3awd/view?usp=sharing',
    title: 'Community Field Archive — Record 08',
    category: 'Field Operations',
    location: 'Techiman & Bono East Region, Ghana',
    description: 'School and community environmental engagement led by GAE field coordinators.',
  },
  {
    id: 'drive-19',
    driveUrl: 'https://drive.google.com/file/d/1Q-eZapmV11bhk7ujiMtMrg9z8Yzt53s_/view?usp=sharing',
    title: 'Community Field Archive — Record 32',
    category: 'Field Operations',
    location: 'Techiman & Bono East Region, Ghana',
    description: 'Field photography capturing active youth participation in regional greening initiatives.',
  },
  {
    id: 'drive-20',
    driveUrl: 'https://drive.google.com/file/d/1QOPEl0jyT1v2ZTwYMuOPyo1XLF3_Hp6K/view?usp=sharing',
    title: 'Community Field Archive — Record 31',
    category: 'Field Operations',
    location: 'Techiman & Bono East Region, Ghana',
    description: 'Hands-on conservation fieldwork and community sensitization in the Bono East Region.',
  },
  {
    id: 'drive-21',
    driveUrl: 'https://drive.google.com/file/d/1TFBpzyBwenSA7-LKg_FKwadZokJTK9db/view?usp=sharing',
    title: 'Community Field Archive — Record 14',
    category: 'Field Operations',
    location: 'Techiman & Bono East Region, Ghana',
    description: 'Collaborative field action with youth clubs, educators, and municipal stakeholders.',
  },
  {
    id: 'drive-22',
    driveUrl: 'https://drive.google.com/file/d/1TkSSTF-2oaLUrYJdap8X8TRaVNBZDoys/view?usp=sharing',
    title: 'Community Field Archive — Record 26',
    category: 'Field Operations',
    location: 'Techiman & Bono East Region, Ghana',
    description: 'Documenting seedling care, sanitation drives, and community conservation outreach.',
  },
  {
    id: 'drive-23',
    driveUrl: 'https://drive.google.com/file/d/1VPowta69XwIRGW6tThVYEUpbIt7-pGNt/view?usp=sharing',
    title: 'Community Field Archive — Record 17',
    category: 'Field Operations',
    location: 'Techiman & Bono East Region, Ghana',
    description: 'Grassroots environmental education and outdoor stewardship sessions in Techiman.',
  },
  {
    id: 'drive-24',
    driveUrl: 'https://drive.google.com/file/d/1X-dkNeg-yJs5saTp6xuzYmAQmaPhKaoF/view?usp=sharing',
    title: 'Community Field Archive — Record 18',
    category: 'Field Operations',
    location: 'Techiman & Bono East Region, Ghana',
    description: 'Field record of GAE volunteers advancing clean and green community initiatives.',
  },
  {
    id: 'drive-25',
    driveUrl: 'https://drive.google.com/file/d/1XhedlW4IJ_NWPPtJ8TWrRds2DoEpNpMw/view?usp=sharing',
    title: 'Community Field Archive — Record 23',
    category: 'Field Operations',
    location: 'Techiman & Bono East Region, Ghana',
    description: 'Active field deployment supporting tree canopy expansion and youth climate awareness.',
  },
  {
    id: 'drive-26',
    driveUrl: 'https://drive.google.com/file/d/1_4nQDDc4gYEeWNa74A_WKFoGcKJptW0d/view?usp=sharing',
    title: 'Community Field Archive — Record 20',
    category: 'Field Operations',
    location: 'Techiman & Bono East Region, Ghana',
    description: 'Regional field engagement with local schools and community conservation partners.',
  },
  {
    id: 'drive-27',
    driveUrl: 'https://drive.google.com/file/d/1_Ha5DDp1S0_xvkMYvq-nvkDgUdIXLuIu/view?usp=sharing',
    title: 'Environmental Protection & Ecosystem Health',
    category: 'Conservation Programs',
    location: 'Techiman & Bono East Region, Ghana',
    description: 'Protecting transitional forest ecosystems and natural habitats for long-term resilience.',
  },
  {
    id: 'drive-28',
    driveUrl: 'https://drive.google.com/file/d/1aDbvnrtOR6ESnFjV1HJT6s-rAAkx6kwB/view?usp=sharing',
    title: 'Public Environmental Awareness Campaign',
    category: 'Conservation Programs',
    location: 'Techiman Municipal District, Ghana',
    description: 'Civic sensitization campaign against plastic pollution, bushfires, and deforestation.',
  },
  {
    id: 'drive-29',
    driveUrl: 'https://drive.google.com/file/d/1araqktgit4cJTxK2eTpr7rsii7OWyA0A/view?usp=sharing',
    title: 'Community Field Archive — Record 02',
    category: 'Field Operations',
    location: 'Techiman & Bono East Region, Ghana',
    description: 'Photographic evidence from GAE youth mobilization and community conservation events.',
  },
  {
    id: 'drive-30',
    driveUrl: 'https://drive.google.com/file/d/1csAJuPQCUui9mJkMMQ9LFYNvkgOJM7lR/view?usp=sharing',
    title: 'Community Field Archive — Record 35',
    category: 'Field Operations',
    location: 'Techiman & Bono East Region, Ghana',
    description: 'Field team operations promoting ecological restoration and local stewardship.',
  },
  {
    id: 'drive-31',
    driveUrl: 'https://drive.google.com/file/d/1dSGeiA1tN5lNxPfeG1aAMvKvKWJQSTZr/view?usp=sharing',
    title: 'Community Field Archive — Record 25',
    category: 'Field Operations',
    location: 'Techiman & Bono East Region, Ghana',
    description: 'Practical conservation outreach with students and community volunteers in Ghana.',
  },
  {
    id: 'drive-32',
    driveUrl: 'https://drive.google.com/file/d/1dWEFhNCp7RccCYfkza-dC2k0Y8vU15UM/view?usp=sharing',
    title: 'Community Field Archive — Record 22',
    category: 'Field Operations',
    location: 'Techiman & Bono East Region, Ghana',
    description: 'On-site record of environmental sanitation and tree planting coordination.',
  },
  {
    id: 'drive-33',
    driveUrl: 'https://drive.google.com/file/d/1doAJVOEX_p_xLpEmDuilQ0s0Lcmdqj1X/view?usp=sharing',
    title: 'Community Field Archive — Record 29',
    category: 'Field Operations',
    location: 'Techiman & Bono East Region, Ghana',
    description: 'Community members and youth stewards participating in GAE field initiatives.',
  },
  {
    id: 'drive-34',
    driveUrl: 'https://drive.google.com/file/d/1eThMb9aqSQodxuGOsFIGogOorFsxeVU9/view?usp=sharing',
    title: 'Community Field Archive — Record 33',
    category: 'Field Operations',
    location: 'Techiman & Bono East Region, Ghana',
    description: 'Field documentation of regional conservation partnerships and civic action.',
  },
  {
    id: 'drive-35',
    driveUrl: 'https://drive.google.com/file/d/1feW51a8-c1Oweu66NijrTPiqrQxIt0XK/view?usp=sharing',
    title: 'Community Field Archive — Record 04',
    category: 'Field Operations',
    location: 'Techiman & Bono East Region, Ghana',
    description: 'Grassroots tree planting and environmental awareness fieldwork in Bono East.',
  },
  {
    id: 'drive-36',
    driveUrl: 'https://drive.google.com/file/d/1guSja_pYKhcZ4KMow_df9K-INAz0c-i-/view?usp=sharing',
    title: 'Community Field Archive — Record 21',
    category: 'Field Operations',
    location: 'Techiman & Bono East Region, Ghana',
    description: 'Youth leadership and conservation outreach documented by the GAE media desk.',
  },
  {
    id: 'drive-37',
    driveUrl: 'https://drive.google.com/file/d/1hLVfXFy8gOa4kAx73_aA6CgVw_ZIxrN3/view?usp=sharing',
    title: 'Community Field Archive — Record 30',
    category: 'Field Operations',
    location: 'Techiman & Bono East Region, Ghana',
    description: 'Field activities advancing clean communities and native tree restoration.',
  },
  {
    id: 'drive-38',
    driveUrl: 'https://drive.google.com/file/d/1hlmJPc9_0XzDJsGR1L6C9Af8vLP-rhuC/view?usp=sharing',
    title: 'Community Field Archive — Record 07',
    category: 'Field Operations',
    location: 'Techiman & Bono East Region, Ghana',
    description: 'Community participation in GAE environmental education and greening drives.',
  },
  {
    id: 'drive-39',
    driveUrl: 'https://drive.google.com/file/d/1mMTq6IemlspfBi2NF7pyTM18bnt6_36d/view?usp=sharing',
    title: 'Community Field Archive — Record 13',
    category: 'Field Operations',
    location: 'Techiman & Bono East Region, Ghana',
    description: 'On-the-ground conservation action across partner schools and neighborhoods.',
  },
  {
    id: 'drive-40',
    driveUrl: 'https://drive.google.com/file/d/1mggZHX2GjCcNRNltbamkc3QBu01wRGrj/view?usp=sharing',
    title: 'Community Field Archive — Record 05',
    category: 'Field Operations',
    location: 'Techiman & Bono East Region, Ghana',
    description: 'Field volunteers engaged in practical ecosystem restoration and cleanup work.',
  },
  {
    id: 'drive-41',
    driveUrl: 'https://drive.google.com/file/d/1nAyrIeHz0Qku36yy1xBN0zqaACCXKW0f/view?usp=sharing',
    title: 'Community Field Archive — Record 15',
    category: 'Field Operations',
    location: 'Techiman & Bono East Region, Ghana',
    description: 'Regional outreach strengthening youth environmental clubs and tree stewardship.',
  },
  {
    id: 'drive-42',
    driveUrl: 'https://drive.google.com/file/d/1nOZWc8GnIz13NC159s6jn8ErZRLIxCMX/view?usp=sharing',
    title: 'Community Field Archive — Record 10',
    category: 'Field Operations',
    location: 'Techiman & Bono East Region, Ghana',
    description: 'Verified photographic record from GAE field conservation deployments in Ghana.',
  },
  {
    id: 'drive-43',
    driveUrl: 'https://drive.google.com/file/d/1o1WPd2wpr3AS6M-Ri8RpXfBsLfPVaakl/view?usp=sharing',
    title: 'Program Directorate — Strategic Operations',
    category: 'Leadership & Identity',
    location: 'Techiman Secretariat, Ghana',
    description: 'Program leadership guiding reforestation nurseries, school outreach, and field monitoring.',
  },
  {
    id: 'drive-44',
    driveUrl: 'https://drive.google.com/file/d/1oIQhZBGmpvmA1jR0X15aVctuhV0-pCQR/view?usp=sharing',
    title: 'Community Field Archive — Record 12',
    category: 'Field Operations',
    location: 'Techiman & Bono East Region, Ghana',
    description: 'Field teamwork during regional tree planting and community awareness sessions.',
  },
  {
    id: 'drive-45',
    driveUrl: 'https://drive.google.com/file/d/1obAaZVMfGi6XOdf5dM2QJBo5BsSkLZ5x/view?usp=sharing',
    title: 'Community Field Archive — Record 09',
    category: 'Field Operations',
    location: 'Techiman & Bono East Region, Ghana',
    description: 'Youth and civic stakeholders collaborating on local conservation goals.',
  },
  {
    id: 'drive-46',
    driveUrl: 'https://drive.google.com/file/d/1reVdZ_3UbJXI2zWzN_CSsi2t_WDR7Ltw/view?usp=sharing',
    title: 'Community Field Archive — Record 19',
    category: 'Field Operations',
    location: 'Techiman & Bono East Region, Ghana',
    description: 'Photographic record of field conservation workshops and community mobilization.',
  },
  {
    id: 'drive-47',
    driveUrl: 'https://drive.google.com/file/d/1t7Zmf9kcMMdnP9sxKGaMBgCh7yy_lPJC/view?usp=sharing',
    title: 'Community Field Archive — Record 16',
    category: 'Field Operations',
    location: 'Techiman & Bono East Region, Ghana',
    description: 'Grassroots volunteers supporting green schoolyards and clean community spaces.',
  },
  {
    id: 'drive-48',
    driveUrl: 'https://drive.google.com/file/d/1vGZDrQd4WGkLIbtvUe4Pq8SmwVMa1sBn/view?usp=sharing',
    title: 'Community Field Archive — Record 28',
    category: 'Field Operations',
    location: 'Techiman & Bono East Region, Ghana',
    description: 'Field documentation of sustainable land management and tree care in Bono East.',
  },
  {
    id: 'drive-49',
    driveUrl: 'https://drive.google.com/file/d/1vSVYI04ehuAcG3QXTcMWv2Vg61lJzkEg/view?usp=sharing',
    title: 'Community Field Archive — Record 06',
    category: 'Field Operations',
    location: 'Techiman & Bono East Region, Ghana',
    description: 'Community outreach and practical environmental stewardship led by GAE.',
  },
  {
    id: 'drive-50',
    driveUrl: 'https://drive.google.com/file/d/1wrXumxMNzCg2fwsYZNiH2wVgAtcmc_lg/view?usp=sharing',
    title: 'Biodiversity & Ecosystem Conservation',
    category: 'Conservation Programs',
    location: 'Bono East Region, Ghana',
    description: 'Conserving biodiversity corridors, sacred groves, and native flora across West Africa.',
  },
];

interface DrivePhotoProps {
  driveUrl: string;
  alt: string;
  width?: number;
  fit?: 'cover' | 'contain';
  className?: string;
}

const DrivePhoto: React.FC<DrivePhotoProps> = ({
  driveUrl,
  alt,
  width = 900,
  fit = 'cover',
  className = '',
}) => {
  const primarySrc = getGoogleDriveImageSrc(driveUrl, width);
  const fallbackSrc = getGoogleDriveFallbackSrc(driveUrl, width);
  const [imgSrc, setImgSrc] = useState<string>(primarySrc);
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    setImgSrc(getGoogleDriveImageSrc(driveUrl, width));
    setLoaded(false);
  }, [driveUrl, width]);

  return (
    <div className="relative w-full h-full">
      {!loaded && (
        <div className="absolute inset-0 bg-emerald-50 animate-pulse" aria-hidden="true" />
      )}
      <img
        src={imgSrc}
        alt={alt}
        loading="lazy"
        decoding="async"
        referrerPolicy="no-referrer"
        onLoad={() => setLoaded(true)}
        onError={() => {
          if (imgSrc !== fallbackSrc) {
            setImgSrc(fallbackSrc);
          } else {
            setLoaded(true);
          }
        }}
        className={`w-full h-full transition-all duration-300 ${
          fit === 'contain' ? 'object-contain p-6 bg-emerald-50/40' : 'object-cover'
        } ${loaded ? 'opacity-100' : 'opacity-0'} ${className}`}
      />
    </div>
  );
};

interface GallerySectionProps {
  isStandalonePage?: boolean;
  onNavigateToGallery?: () => void;
}

export const GallerySection: React.FC<GallerySectionProps> = ({
  isStandalonePage = true,
  onNavigateToGallery,
}) => {
  const [activeCategory, setActiveCategory] = useState<'All' | GalleryCategory>('All');
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [showAllInline, setShowAllInline] = useState<boolean>(false);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState<boolean>(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);
  const [submitSending, setSubmitSending] = useState<boolean>(false);
  const [submitEmail, setSubmitEmail] = useState<string>('');
  const [submitTitle, setSubmitTitle] = useState<string>('');

  const categories: { id: 'All' | GalleryCategory; label: string; count: number }[] = [
    { id: 'All', label: 'All Photos', count: GOOGLE_DRIVE_GALLERY_ITEMS.length },
    {
      id: 'Field Operations',
      label: 'Field Operations',
      count: GOOGLE_DRIVE_GALLERY_ITEMS.filter((i) => i.category === 'Field Operations').length,
    },
    {
      id: 'Conservation Programs',
      label: 'Conservation Programs',
      count: GOOGLE_DRIVE_GALLERY_ITEMS.filter((i) => i.category === 'Conservation Programs').length,
    },
    {
      id: 'Leadership & Identity',
      label: 'Leadership & Identity',
      count: GOOGLE_DRIVE_GALLERY_ITEMS.filter((i) => i.category === 'Leadership & Identity').length,
    },
  ];

  const filteredItems = GOOGLE_DRIVE_GALLERY_ITEMS.filter((item) => {
    if (activeCategory === 'All') return true;
    return item.category === activeCategory;
  });

  const displayAll = isStandalonePage || showAllInline;
  const visibleItems = displayAll ? filteredItems : filteredItems.slice(0, 12);
  const selectedImage =
    selectedIndex !== null && filteredItems[selectedIndex] ? filteredItems[selectedIndex] : null;

  const handlePrevImage = useCallback(() => {
    setSelectedIndex((prev) => {
      if (prev === null || filteredItems.length === 0) return null;
      return (prev - 1 + filteredItems.length) % filteredItems.length;
    });
  }, [filteredItems.length]);

  const handleNextImage = useCallback(() => {
    setSelectedIndex((prev) => {
      if (prev === null || filteredItems.length === 0) return null;
      return (prev + 1) % filteredItems.length;
    });
  }, [filteredItems.length]);

  useEffect(() => {
    if (selectedIndex === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedIndex(null);
      if (e.key === 'ArrowLeft') handlePrevImage();
      if (e.key === 'ArrowRight') handleNextImage();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [selectedIndex, handlePrevImage, handleNextImage]);

  const handleSubmitPhoto = async (e: React.FormEvent) => {
    e.preventDefault();
    const email = submitEmail.trim();
    const title = submitTitle.trim();
    if (!email || !title || submitSending) return;
    setSubmitSending(true);
    try {
      await fetch(`https://formsubmit.co/ajax/${GAE_INFO.email}`, {
        method: 'POST',
        referrerPolicy: 'origin',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          email,
          _replyto: email,
          event_or_photo_title: title,
          _subject: `[GAE Media Desk] Field Photography Request — ${title}`,
          message: `Media/Press submission or asset access request from ${email} regarding "${title}".`,
          _template: 'table',
          _captcha: 'false',
        }),
      });
    } catch {
      // Fall through to confirmation with direct Secretariat contact info
    } finally {
      setSubmitSending(false);
      setSubmitSuccess(true);
    }
  };

  return (
    <section
      id="gallery"
      className="py-16 sm:py-20 bg-white text-slate-900 border-b border-emerald-100 font-sans"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-emerald-100 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-2 text-xs">
              <span className="font-mono font-bold uppercase tracking-wider text-emerald-700">
                Field Repository
              </span>
              <span className="text-slate-300" aria-hidden="true">
                &middot;
              </span>
              <span className="text-slate-500 font-mono">
                {GOOGLE_DRIVE_GALLERY_ITEMS.length} Google Drive Media Records
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Photographic Documentation of Community Impact
            </h2>
            <p className="mt-2 text-slate-600 text-sm max-w-2xl leading-relaxed">
              Live photographic archive streamed directly from Global Alliance on Environment's official Google Drive repository — documenting reforestation nurseries, youth climate education, clean water protection, and community fieldwork across Ghana.
            </p>
          </div>

          <button
            onClick={() => setIsSubmitModalOpen(true)}
            className="self-start md:self-auto bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2.5 rounded-md transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
          >
            <Upload className="w-3.5 h-3.5 text-white" />
            <span>Submit Media / Press</span>
          </button>
        </div>

        {/* Category Filter Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-1.5 bg-emerald-50 p-1.5 rounded-md border border-emerald-200">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveCategory(cat.id);
                    setSelectedIndex(null);
                  }}
                  className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-xs font-bold'
                      : 'text-slate-700 hover:text-emerald-800 hover:bg-emerald-100/60'
                  }`}
                >
                  {cat.label} ({cat.count})
                </button>
              );
            })}
          </div>

          <p className="text-xs text-slate-500 font-mono">
            Showing {visibleItems.length} of {filteredItems.length} photos
          </p>
        </div>

        {/* Gallery Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleItems.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => setSelectedIndex(idx)}
              className="bg-white border border-emerald-200 hover:border-emerald-500 rounded-xl overflow-hidden transition-all duration-200 group flex flex-col justify-between cursor-pointer hover:shadow-md"
            >
              {/* Photo Frame */}
              <div className="relative aspect-4/3 overflow-hidden bg-slate-100">
                <DrivePhoto
                  driveUrl={item.driveUrl}
                  alt={item.title}
                  width={900}
                  fit={item.fit}
                  className={item.fit === 'contain' ? '' : 'group-hover:scale-105'}
                />

                {item.fit !== 'contain' && (
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-70 group-hover:opacity-50 transition-opacity pointer-events-none" />
                )}

                {/* Lightbox Zoom Icon Overlay */}
                <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-emerald-950/20 pointer-events-none">
                  <div className="w-10 h-10 rounded-md bg-emerald-600 text-white flex items-center justify-center shadow-lg">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>

                {/* Location Overlay Bottom */}
                {item.fit !== 'contain' && (
                  <div className="absolute bottom-2.5 left-3 right-3 z-10 flex items-center justify-between text-white text-[11px] font-medium font-mono pointer-events-none">
                    <span className="flex items-center gap-1 text-slate-100 truncate">
                      <MapPin className="w-3 h-3 text-emerald-400 shrink-0" />
                      <span className="truncate">{item.location}</span>
                    </span>
                  </div>
                )}
              </div>

              {/* Card Body Information */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center gap-1.5 text-[11px] text-emerald-700 font-mono font-semibold mb-1">
                    <span>{item.category}</span>
                    <span className="text-slate-300" aria-hidden="true">
                      &middot;
                    </span>
                    <span className="text-slate-500">
                      #{String(idx + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-1 mb-1">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-emerald-100 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-slate-500 font-mono">
                    Google Drive Archive
                  </span>

                  <span className="font-bold text-emerald-700 group-hover:underline flex items-center gap-1">
                    <span>View Photo</span>
                    <ArrowRight className="w-3.5 h-3.5 text-emerald-600" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Expand / Open Full Gallery CTA when embedded on Home Page */}
        {!displayAll && filteredItems.length > visibleItems.length && (
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            {onNavigateToGallery ? (
              <button
                type="button"
                onClick={() => {
                  onNavigateToGallery();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wide rounded-md shadow-sm transition-colors inline-flex items-center gap-2 cursor-pointer"
              >
                <span>Open Full Gallery ({GOOGLE_DRIVE_GALLERY_ITEMS.length} Photos)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : null}
            <button
              type="button"
              onClick={() => setShowAllInline(true)}
              className="px-5 py-3 bg-white hover:bg-emerald-50 text-emerald-800 border border-emerald-300 text-xs font-bold uppercase tracking-wide rounded-md transition-colors cursor-pointer"
            >
              Show All {filteredItems.length} Photos Here
            </button>
          </div>
        )}

        {/* Media Contribution Banner */}
        <div className="bg-emerald-800 text-white border border-emerald-700 rounded-xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="space-y-2 max-w-2xl">
            <p className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-200">
              GAE Media Desk &middot; Press Archive
            </p>
            <h3 className="text-lg sm:text-xl font-bold tracking-tight text-white">
              Field Photographers, Researchers &amp; Press
            </h3>
            <p className="text-xs text-emerald-100/90 leading-relaxed">
              We welcome high-resolution photos, drone surveys, and video documentation from community tree planting days, nursery operations, and water conservation events across Techiman and Bono East Region.
            </p>
          </div>

          <button
            onClick={() => setIsSubmitModalOpen(true)}
            className="px-5 py-3 rounded-md bg-white hover:bg-emerald-50 text-emerald-950 font-bold text-xs uppercase tracking-wide transition-colors shrink-0 flex items-center gap-2 cursor-pointer shadow-md"
          >
            <Upload className="w-4 h-4 text-emerald-800" />
            <span>Submit Media / Request Access</span>
          </button>
        </div>
      </div>

      {/* Lightbox Image Preview Modal */}
      <AnimatePresence>
        {selectedImage && selectedIndex !== null && (
          <div
            onClick={() => setSelectedIndex(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white border-2 border-emerald-200 text-slate-900 rounded-xl max-w-4xl w-full overflow-hidden relative shadow-2xl"
            >
              <button
                onClick={() => setSelectedIndex(null)}
                className="absolute top-3 right-3 z-30 p-2 bg-white/95 hover:bg-white text-slate-700 hover:text-slate-900 rounded-full transition-colors border border-slate-300 shadow-md cursor-pointer"
                aria-label="Close preview"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="relative aspect-16/10 bg-slate-950 overflow-hidden flex items-center justify-center">
                <img
                  key={selectedImage.id}
                  src={getGoogleDriveImageSrc(selectedImage.driveUrl, 1800)}
                  onError={(e) => {
                    const fallback = getGoogleDriveFallbackSrc(selectedImage.driveUrl, 1800);
                    if (e.currentTarget.src !== fallback) {
                      e.currentTarget.src = fallback;
                    }
                  }}
                  alt={selectedImage.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain"
                />

                {filteredItems.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={handlePrevImage}
                      className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-white/90 hover:bg-white text-slate-900 shadow-md transition-colors cursor-pointer"
                      aria-label="Previous photo"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      type="button"
                      onClick={handleNextImage}
                      className="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-white/90 hover:bg-white text-slate-900 shadow-md transition-colors cursor-pointer"
                      aria-label="Next photo"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>

              <div className="p-5 sm:p-6 space-y-3 bg-white">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 font-mono">
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-700 font-bold">
                      {selectedImage.category}
                    </span>
                    <span aria-hidden="true">&middot;</span>
                    <span>{selectedImage.location}</span>
                  </div>
                  <span>
                    Photo {selectedIndex + 1} of {filteredItems.length}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                  {selectedImage.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {selectedImage.description}
                </p>

                <div className="pt-3 border-t border-emerald-100 flex flex-wrap items-center justify-between gap-3">
                  <a
                    href={selectedImage.driveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 hover:underline inline-flex items-center gap-1.5"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Open Original in Google Drive</span>
                  </a>

                  <button
                    onClick={() => setSelectedIndex(null)}
                    className="px-4 py-2 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors cursor-pointer shadow-xs"
                  >
                    Close Preview
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Media Submission Modal */}
      <AnimatePresence>
        {isSubmitModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white border border-emerald-200 rounded-xl max-w-md w-full p-6 sm:p-8 relative shadow-2xl space-y-4 text-slate-900"
            >
              <button
                onClick={() => {
                  setIsSubmitModalOpen(false);
                  setSubmitSuccess(false);
                }}
                className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-md transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {submitSuccess ? (
                <div className="text-center space-y-3 py-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">Media Request Sent</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Thank you. Your media request has been routed to{' '}
                    <span className="font-mono font-semibold text-emerald-800">
                      {GAE_INFO.email}
                    </span>
                    . You can also send high-resolution files directly via WhatsApp at{' '}
                    <a
                      href={GAE_INFO.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-700 font-mono font-semibold hover:underline"
                    >
                      {GAE_INFO.whatsapp}
                    </a>
                    .
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitModalOpen(false);
                      setSubmitSuccess(false);
                      setSubmitEmail('');
                      setSubmitTitle('');
                    }}
                    className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-md cursor-pointer shadow-sm"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmitPhoto} className="space-y-4">
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase text-emerald-700">
                      GAE MEDIA &amp; PRESS DESK
                    </span>
                    <h3 className="text-lg font-extrabold text-slate-900 mt-0.5">
                      Submit Field Photography
                    </h3>
                    <p className="text-xs text-slate-600 mt-1">
                      Share community photos or request high-resolution press assets from GAE operations.
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">
                      Your Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="photographer@organization.org"
                      value={submitEmail}
                      onChange={(e) => setSubmitEmail(e.target.value)}
                      className="w-full bg-slate-50 border border-emerald-200 rounded-md px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-emerald-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">
                      Event / Photo Title *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Techiman Tree Planting Drive 2026"
                      value={submitTitle}
                      onChange={(e) => setSubmitTitle(e.target.value)}
                      className="w-full bg-slate-50 border border-emerald-200 rounded-md px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-emerald-600"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitSending}
                    className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wide rounded-md shadow-md shadow-emerald-600/25 transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                  >
                    {submitSending ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Sending Request...</span>
                      </>
                    ) : (
                      <span>Send Media Request</span>
                    )}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
