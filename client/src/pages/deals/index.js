const { default: Link } = require("next/link");

const DealsIndex = () => {
  <Link href="/deals/create">
    <a>Create a deal</a>
  </Link>;
};

export default DealsIndex;
