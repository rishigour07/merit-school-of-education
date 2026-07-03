export const school = {
  name: "Merit School of Education Rampura",
  shortName: "Merit School",
  location: "Rampura, Sirali, District Harda, Madhya Pradesh",
  taglineHindi:
    "\u0936\u093f\u0915\u094d\u0937\u093e \u2022 \u0938\u0947\u0935\u093e \u2022 \u0938\u0902\u0938\u094d\u0915\u093e\u0930",
  admission: "Admission Open 2025-26",
  classes: "Play Group to 10th Class",
  medium: "English & Hindi Medium",
  schoolCode: "682100",
  diseCode: "23360310003",
  officeTime: "Morning 10 AM to Evening 4 PM",
  address:
    "Near Gramin Khel Maidan, Chachruva Road, Rampura, Sirali, District Harda, Madhya Pradesh",
  phones: ["9926909903", "9977525216", "9926414771"],
  email: "meritschoolofeducation@gmail.com",
  instagram: "merit_school_of_education"
};

export const schoolPhotos = {
  hero:
    "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1600&q=85",
  classroom:
    "https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=1600&q=85",
  teacher:
    "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1600&q=85",
  campus: "/assets/merit-school-campus.webp",
  library:
    "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1600&q=85",
  sports:
    "https://images.unsplash.com/photo-1526232761682-d26e03ac148e?auto=format&fit=crop&w=1600&q=85",
  activity:
    "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1600&q=85",
  students:
    "https://images.unsplash.com/photo-1588075592446-265fd1e6e76f?auto=format&fit=crop&w=1600&q=85",
  assembly:
    "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=1600&q=85"
};

export const galleryPhotos = [
  {
    title: "Classroom Learning",
    src: schoolPhotos.classroom,
    alt: "Students learning in a bright classroom"
  },
  {
    title: "Sports Activity",
    src: schoolPhotos.sports,
    alt: "Children playing football outdoors"
  },
  {
    title: "Cultural Program",
    src: schoolPhotos.assembly,
    alt: "Students participating in school activities"
  },
  {
    title: "Student Life",
    src: schoolPhotos.hero,
    alt: "Students and teacher in a classroom"
  },
  {
    title: "Campus Environment",
    src: schoolPhotos.campus,
    alt: "Modern school campus building"
  },
  {
    title: "Creative Learning",
    src: schoolPhotos.activity,
    alt: "Students doing creative school activities"
  }
];

export const whatsappNumber = "919926909903";

export function toWhatsAppNumber(value: string) {
  const digits = value.replace(/\D/g, "");

  if (digits.startsWith("91") && digits.length >= 12) {
    return digits;
  }

  if (digits.length === 10) {
    return `91${digits}`;
  }

  return digits || whatsappNumber;
}

export const admissionMessage =
  "Hello Merit School, I want admission information.";

export const navLinks = [
  { href: "/#home", label: "Home" },
  { href: "/#about", label: "About Us" },
  { href: "/#academics", label: "Academics" },
  { href: "/#admissions", label: "Admissions" },
  { href: "/#facilities", label: "Facilities" },
  { href: "/#beyond-classroom", label: "School Life" },
  { href: "/#gallery", label: "Gallery" },
  { href: "/#contact", label: "Contact" }
];

export const documentsRequired = [
  "Student Photo",
  "Aadhaar Card",
  "Birth Certificate",
  "Previous Marksheet / TC if applicable",
  "Parent ID Proof"
];
