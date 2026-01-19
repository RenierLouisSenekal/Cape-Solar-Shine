/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


export interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  tag: string;
  description: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}

export enum Section {
  HERO = 'hero',
  BENEFITS = 'benefits',
  INFO = 'info',
  CONTACT = 'contact',
}