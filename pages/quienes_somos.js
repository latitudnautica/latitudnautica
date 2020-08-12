import MainLayout from "components/layouts/MainLayout";
import SpringSlider from "components/SpringSlider";

const QuienesSomos = () => {
  return (
    <div>
      <h1>Quienes Somos</h1>
      <SpringSlider />
    </div>
  );
};

QuienesSomos.Layout = MainLayout;

export default QuienesSomos;
