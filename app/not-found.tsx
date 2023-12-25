import Link from "next/link";
import error404image from "@/assets/error404image.png"
import Image from "next/image";

const Page = function Custom404() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-[90vh] overflow-hidden p-4">
      <Image src={error404image} className="w-2/3 max-w-sm" alt="404" />
      <div className="mb-2 text-lg">Page Not Found!</div>
      <Link href='/' className="customButton">Go Home</Link>
    </div>
  );
};
export default Page;
