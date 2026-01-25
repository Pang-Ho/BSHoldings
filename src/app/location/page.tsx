import { Metadata } from 'next';
import LocationPageClient from './LocationPageClient';

export const metadata: Metadata = {
  title: '오시는길',
  description:
    'BS홀딩스 찾아오시는 길. 경기도 안산시 단원구 원포공원 1로 59, B동 201호. 전화: 031-411-5011',
  keywords: [
    'BS홀딩스',
    '오시는길',
    '찾아오시는길',
    '위치',
    '연락처',
    '안산시',
    '단원구',
  ],
  openGraph: {
    title: '오시는길 | BS홀딩스',
    description:
      'BS홀딩스 찾아오시는 길. 경기도 안산시 단원구 원포공원 1로 59, B동 201호',
    url: 'https://bestsensor.kr/location',
    type: 'website',
  },
};

export default function LocationPage() {
  return <LocationPageClient />;
}
