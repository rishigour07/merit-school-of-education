export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

type GenericRow = {
  [key: string]: Json | undefined;
};

export type Database = {
  public: {
    Tables: {
      site_settings: { Row: GenericRow; Insert: GenericRow; Update: GenericRow };
      hero_section: { Row: GenericRow; Insert: GenericRow; Update: GenericRow };
      about_section: { Row: GenericRow; Insert: GenericRow; Update: GenericRow };
      admission_info: { Row: GenericRow; Insert: GenericRow; Update: GenericRow };
      academics: { Row: GenericRow; Insert: GenericRow; Update: GenericRow };
      facilities: { Row: GenericRow; Insert: GenericRow; Update: GenericRow };
      activities: { Row: GenericRow; Insert: GenericRow; Update: GenericRow };
      gallery_images: { Row: GenericRow; Insert: GenericRow; Update: GenericRow };
      notices: { Row: GenericRow; Insert: GenericRow; Update: GenericRow };
      events: { Row: GenericRow; Insert: GenericRow; Update: GenericRow };
      teachers: { Row: GenericRow; Insert: GenericRow; Update: GenericRow };
      testimonials: { Row: GenericRow; Insert: GenericRow; Update: GenericRow };
      enquiries: { Row: GenericRow; Insert: GenericRow; Update: GenericRow };
      contact_messages: { Row: GenericRow; Insert: GenericRow; Update: GenericRow };
      contact_details: { Row: GenericRow; Insert: GenericRow; Update: GenericRow };
      seo_settings: { Row: GenericRow; Insert: GenericRow; Update: GenericRow };
      admin_profiles: { Row: GenericRow; Insert: GenericRow; Update: GenericRow };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
