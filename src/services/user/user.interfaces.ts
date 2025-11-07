

export interface ILoginPayload {
   user_uid: string;
}
export interface IInvitationCodePayload {
   invitation_code: string;
}
export interface ICreateAccountPayload {
   firstname: string;
   lastname: string;
   username: string;
   about: string;
   country: string;
   knowAboutUs: string;
   phonenumber: any;
   email: any;
   photourl: any;
}

export interface IDeletePayload {
   user_uid: string;
}
export interface IChatPayload {
   question: string;
   session_id: any;
   slug: string;
   bot_username?: string;
}
export interface ICheckUsernamePayload {
   username: string;
}
export interface IUserDetailPayload extends ICheckUsernamePayload {
   bot_username?: string;
}
export interface BrowserDetail {
   platform: string;
   userAgent: string;
}

export interface IUserSessionPayload {
   activity_type: string;
   browser_detail: BrowserDetail;
   session_id?: string;
   username: string;
   bot_username?: string;
}
export interface IUserConversationCountPayload {
   guest_id: any;
   session_id: string;
   slug: string;
   bot_username?: string;
}
export interface IUserSaveAnoDetailPayload {
   session_id: string;
   form_details: {
      id: string;
      label: string;
      options: string[];
      required: boolean;
      type: string;
      value: string | string[];
   }[];
   slug: any;
   bot_username?: string;
}
export interface IClearHistoryPayload {
   session_id: any;
   slug: string;
   bot_username?: string;
}
export interface ISaveFormDetailsPayload {
   session_id: string;
   slug: string;
   bot_username: string;
   form_details: {
      id: string;
      label: string;
      value: string | string[];
      type: string;
      options?: string[];
   }[];
} 
export interface ImageDecodePayload {
   key: string;
}
export interface BusinessProfile {
  _id: string;
  about_text?: string;
  banner_image?: string;
  business_name?: string;
  business_type?: string;
  google_map_link?: string;
  header_text?: string;
  logo?: string;
  logo_image?: string;
  logo_url?: string;
  phone_number?: string;
  photo?: string;
  photo_urls?: string[];        // list of image URLs
  services?: string;
  template_name?: string;
  user_uid?: string;
  whatsapp_url?: string;
}

export interface FormDataType {
    businessName: string;
    businessType: string;
    phoneNumber: string;
    headerText: string;
    aboutText: string;
    whatsAppUrl: string;
    googleMapLink: string;
    templateName: string;
    uploadBannerImage: File | string;
    uploadLogo: File | string;
    services: { title: string; description: string; }[];
}

export interface TemplateFormDataType extends FormDataType {
    botName?: string;
}

export interface Slugs{
  username?: string;
  botUsername?: string;
}

export interface formDetail {
  id: string;
  label: string;
  options: string[];
  required: boolean;
  type: string;
  value: string | string[];
}

export interface LeadFormProps extends Slugs { 
  form_bg: string,
  type: "keyword" | "sequence",
  button_style: string, 
  handleClose: () => void,
  formFields: formDetail[],
  sessionID: string
}