import About from "@/components/About";
import AdmissionEnquiryModal from "@/components/AdmissionEnquiryModal";
import AdmissionInfo from "@/components/AdmissionInfo";
import Academics from "@/components/Academics";
import Activities from "@/components/Activities";
import Contact from "@/components/Contact";
import DocumentsRequired from "@/components/DocumentsRequired";
import EnquiryForm from "@/components/EnquiryForm";
import Events from "@/components/Events";
import Facilities from "@/components/Facilities";
import FloatingButtons from "@/components/FloatingButtons";
import Footer from "@/components/Footer";
import Gallery from "@/components/Gallery";
import Hero from "@/components/Hero";
import Highlights from "@/components/Highlights";
import HowToApply from "@/components/HowToApply";
import Navbar from "@/components/Navbar";
import NoticesResources from "@/components/NoticesResources";
import ParentDesk from "@/components/ParentDesk";
import PrincipalMessage from "@/components/PrincipalMessage";
import Teachers from "@/components/Teachers";
import Testimonials from "@/components/Testimonials";
import VisionMission from "@/components/VisionMission";
import WhyChooseUs from "@/components/WhyChooseUs";
import { getPublicContent } from "@/lib/content";

export default async function Home() {
  const content = await getPublicContent();

  return (
    <>
      <Navbar settings={content.siteSettings} contact={content.contact} />
      <main>
        <Hero content={content.hero} />
        <ParentDesk />
        <About content={content.about} />
        <NoticesResources notices={content.notices} />
        <AdmissionInfo content={content.admission} />
        <VisionMission />
        <WhyChooseUs />
        <Academics items={content.academics} />
        <Facilities items={content.facilities} />
        <Activities items={content.activities} />
        <Events items={content.events} />
        <Teachers items={content.teachers} />
        <Highlights />
        <HowToApply />
        <DocumentsRequired items={content.admission.documentsRequired} />
        <Gallery items={content.galleryImages} />
        <PrincipalMessage />
        <Testimonials items={content.testimonials} />
        <EnquiryForm />
        <Contact content={content.contact} />
      </main>
      <Footer settings={content.siteSettings} contact={content.contact} />
      <FloatingButtons phoneNumber={content.contact.whatsappNumber} />
      <AdmissionEnquiryModal />
    </>
  );
}
