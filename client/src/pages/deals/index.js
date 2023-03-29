const { default: Link } = require("next/link");

const Deals = () => {
  return <Link href={"/deals/create"}>Create a deal</Link>;
};
export default Deals;
