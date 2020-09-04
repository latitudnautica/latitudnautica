/* eslint-disable import/no-unresolved */
import axiosBase from '@/utils/axiosBase';

import FeaturedProducts from 'components/FeaturedProducts';
import CategoriesNavbar from '@/components/CategoriesNavbar';
import MainLayout from '@/components/layouts/MainLayout';
import HomeCarrousel from '@/components/HomeCarrousel';
import BannerFullWidth from '@/components/BannerFullWidth';
import BannerCreditCards from '@/components/BannerCreditCards';

const Index = ({ featuredProducts, banners, categories }) => (
  <>
    <CategoriesNavbar _categories={categories} />
    <BannerFullWidth>Hace tus consultas por WhatsApp</BannerFullWidth>
    <HomeCarrousel bannersData={banners} />
    <FeaturedProducts featuredProducts={featuredProducts} />
    <BannerCreditCards />
  </>
);

Index.Layout = MainLayout;

export default Index;

export async function getStaticProps() {
  const categories = await axiosBase('/category/all').then((res) => res.data);
  const banners = await axiosBase('/utils/banners').then((res) => res.data);
  const featuredProducts = await axiosBase('/product/featured').then(
    (res) => res.data,
  );

  return {
    props: {
      featuredProducts,
      banners,
      categories,
    },
    revalidate: 1,
  };
}
