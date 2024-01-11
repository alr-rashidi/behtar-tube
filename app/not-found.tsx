import error404image from "@/assets/error404image.png";
import Button from "@/components/ui/Button";
import Image from "next/image";
import Link from "next/link";

const Page = function Custom404() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-[90vh] overflow-hidden p-4">
      <Image src={error404image} className="w-2/3 max-w-sm" alt="404" />
      <div className="mb-2 text-lg">Page Not Found!</div>
      <Link href="/">
        <Button className="p-2">Go Home</Button>
      </Link>
    </div>
  );
};
export default Page;