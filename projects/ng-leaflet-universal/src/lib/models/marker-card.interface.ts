export interface MarkerCard {
  image?: CardImage;
  title: CardText;
  subtitle?: CardText;
  address?: CardText;
  content?: CardText;
  cardStyle?: CardStyle;
  callToActions?: CardCallToAction[];
  customStyleClass?: string;
  customHtml?: string;
}

export interface CardImage {
  width?: string;
  height?: string;
  url: string;
  secureBase64?: boolean;
  rounded?: boolean;
  customStyleClass?: string;
}

export interface CardText {
  text: string;
  size?: string;
  color?: string;
  customStyleClass?: string;
}

export interface CardStyle {
  backgroundColor: string;
  borderRadius: string;
  elevation: number;
  opacity: number;
  enabledTextOpacity: boolean;
  customStyleClass: string;
}

export class CardCallToAction {
  text: string;
  backgroundColor?: string;
  textColor?: string;
  link: string;
  elevation?: string;
  customStyleClass?: string;
  icon?: string;
}
