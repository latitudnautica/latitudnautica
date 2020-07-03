import CmsLayout from "../../layouts/CmsLayout";
import styled from "styled-components";
import Link from "next/link";

const Menu = styled.div`
  display: inline;
`;

export default function main() {
  return (
    <div>
      <CmsLayout>
        <Menu>
          <Link href='/cms/cargar_producto'>
            <a>Cargar Producto</a>
          </Link>
        </Menu>
      </CmsLayout>
    </div>
  );
}
