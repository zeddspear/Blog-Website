import { FaGithub } from "react-icons/fa";

function Footer() {
  return (
    <div className="bg-primaryMain text-secondaryMain h-10 flex justify-center items-center fixed bottom-0 w-full ">
      <p>Made by Zeddspear</p>
      <a
        className="ml-1 mt-[2px]"
        href="https://github.com/zeddspear"
        target="_blank"
      >
        <FaGithub size={15} />
      </a>
    </div>
  );
}
export default Footer;
