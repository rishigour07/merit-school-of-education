import { documentsRequired, galleryPhotos, school, schoolPhotos } from "@/lib/school";

export const defaultContent = {
  hero: {
    badgeText: school.admission,
    mainHeading: "Shaping Bright Futures with Quality Education",
    subheading:
      "A trusted English and Hindi medium school in Rampura where education, discipline and character help every child grow with confidence.",
    description:
      "A trusted English and Hindi medium school in Rampura for Play Group to 10th Class, focused on academic excellence, discipline, confidence and strong values.",
    ctaText: "Explore Admissions",
    heroImageUrl: schoolPhotos.hero,
    admissionStatusText: school.admission
  },
  about: {
    heading: "Welcome to Merit School of Education Rampura",
    description:
      "Merit School supports children through academic clarity, discipline, activities and strong values. The school is built around parent trust, classroom focus and practical all-round development.",
    imageUrl: schoolPhotos.campus,
    values: ["शिक्षा", "सेवा", "संस्कार"]
  },
  admission: {
    session: "2025-26",
    status: "open",
    classesOffered: school.classes,
    medium: school.medium,
    officeTiming: school.officeTime,
    schoolCode: school.schoolCode,
    diseCode: school.diseCode,
    documentsRequired,
    ctaText: "Apply for Admission"
  },
  academics: [
    {
      title: "Play Group",
      description:
        "Activity-based learning, classroom routine, language exposure and joyful confidence building.",
      imageUrl: schoolPhotos.activity,
      icon: "Baby"
    },
    {
      title: "Primary Classes",
      description:
        "Concept clarity, reading habits, numeracy, regular practice, discipline and values.",
      imageUrl: schoolPhotos.classroom,
      icon: "BookOpenCheck"
    },
    {
      title: "Middle Classes",
      description:
        "Regular assessment, guided learning, communication skills and responsibility.",
      imageUrl: schoolPhotos.students,
      icon: "School"
    },
    {
      title: "High School up to 10th",
      description:
        "Focused academics, exam readiness, confidence building and strong study habits.",
      imageUrl: schoolPhotos.teacher,
      icon: "GraduationCap"
    }
  ],
  facilities: [
    { title: "Smart Classrooms", description: "Interactive and structured classroom learning.", icon: "Presentation" },
    { title: "Experienced Faculty", description: "Teachers focused on discipline, clarity and care.", icon: "BookOpen" },
    { title: "Library Support", description: "Reading habits and reference support for learners.", icon: "Library" },
    { title: "Sports Activities", description: "Outdoor activity and confidence building.", icon: "Trophy" },
    { title: "Cultural Programs", description: "Stage exposure, celebration and school participation.", icon: "CalendarDays" },
    { title: "Safe Campus", description: "A parent-friendly, disciplined school routine.", icon: "Shield" }
  ],
  activities: [
    { title: "Sports", description: "Team play, fitness and participation.", imageUrl: schoolPhotos.sports },
    { title: "Cultural Programs", description: "Confidence through school events.", imageUrl: schoolPhotos.assembly },
    { title: "Morning Assembly", description: "Routine, discipline and values.", imageUrl: schoolPhotos.students },
    { title: "Art & Craft", description: "Creative expression and fine motor skills.", imageUrl: schoolPhotos.activity },
    { title: "Personality Development", description: "Confidence, speaking and self-expression.", imageUrl: schoolPhotos.hero },
    { title: "Moral Education", description: "Values, manners and responsible behaviour.", imageUrl: schoolPhotos.classroom }
  ],
  galleryImages: galleryPhotos.map((photo, index) => ({
    title: photo.title,
    description: photo.alt,
    imageUrl: photo.src,
    altText: photo.alt,
    sortOrder: index,
    category: photo.title,
    isFeatured: index === 0
  })),
  notices: [
    {
      title: "Admission Open 2025-26",
      description: "Admissions are open for Play Group to 10th Class.",
      date: "2025-04-01",
      isFeatured: true
    },
    {
      title: "School Office Timing",
      description: school.officeTime,
      date: "2025-04-01"
    }
  ],
  events: [
    {
      title: "Parent Interaction Week",
      description: "Meet the school office for admission guidance and campus visit support.",
      date: "2025-06-15",
      location: "Merit School Campus",
      imageUrl: schoolPhotos.campus
    },
    {
      title: "Student Activity Day",
      description: "A school activity day focused on creativity, confidence and participation.",
      date: "2025-07-10",
      location: "Rampura",
      imageUrl: schoolPhotos.activity
    }
  ],
  teachers: [
    {
      name: "Academic Faculty",
      designation: "Teaching Team",
      qualification: "Trained Educators",
      subject: "All Subjects",
      experience: "Experienced",
      photoUrl: schoolPhotos.teacher,
      shortBio:
        "Our teachers support students with classroom clarity, discipline and regular guidance."
    }
  ],
  testimonials: [
    {
      parentName: "Parent Community",
      studentClass: "Merit School",
      message:
        "The school gives children a disciplined, caring and confidence-building environment.",
      rating: 5
    }
  ],
  contact: {
    address: school.address,
    phoneNumbers: school.phones,
    whatsappNumber: school.phones[0],
    email: school.email,
    instagramHandle: school.instagram,
    officeTiming: school.officeTime
  }
};
