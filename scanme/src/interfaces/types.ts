import { ContactType, ContentType } from "../enums/enums"

export interface IGetMeProfile {
  active: boolean
  countryIso: any
  email: string
  id: number
  name: string
  phoneNumber: string
  profilePic: string
  surname: string
}
export interface ICardItem {
  about: string,
  active: boolean
  cardId: number
  company: string
  countryIso: string | null
  coverImage: string | null
  editable: boolean
  id: number
  location: string
  name: string
  profilePic: string | null
  qrCodeId: number
  specialization: string
  surname: string
  tags: string[]
  userCardContent: any[]
  userId: string
}
export interface IRegister {
  name: string
  surname: string
  password: string
  phoneNumber: string,
  countryIso?: string
  email: string
  confirmPassword: string
}

export interface IEditUser {
  id?: number,
  info: IUserEditedInfo
}

export interface ICardId {
  cardId: number,
}

export interface IUserId {
  id: number
}

export interface IUserEditedInfo {
  countryIso: string,
  email: string,
  phoneNumber: string
}

export interface IEventSizes {
  layoutMeasurement: ISizes,
  contentOffset: ICoordinates,
  contentSize: ISizes,
}

interface ISizes {
  width: number,
  height: number
}
interface ICoordinates {
  x: number,
  y: number
}
export interface IAddCard {
  about?: string
  company?: string
  location?: string
  name: string
  specialization?: string
  surname: string
  tags?: string[]
  userCardContentRequest?: any[]//IUserCardContentRequest[],
  userId?: number,
  isActive?: boolean
}
export interface IUserCardContentRequest {
  id: number,
  linkTitle: string
  placeholder: string
  contentInfo?: ContentData
}
export interface ContentData {
  id: number;
  name: string;
  contentType: ContentType;
  contactType: ContactType | null;
  contentIcon: string;
  editable: boolean;
}
export interface IChangePassord {
  confirmPassword: string
  newPassword: string
  token: string
}
export interface ICodeConfirm {
  verificationCode: string
}
export interface IResendCodeConfirm {
  userPhoneNumber: string,
  countryISO: string
}