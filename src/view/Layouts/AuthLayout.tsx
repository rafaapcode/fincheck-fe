import illustration from "../../assets/illustration.png";
import Logo from "../components/Logo";

function AuthLayout() {
  return (
    <div className="flex w-full h-full">
      <div className="w-1/2 h-full"></div>
      <div className="w-1/2 h-full flex justify-center relative items-center p-8">
        <img
          src={illustration}
          alt="Image of login page"
          className="object-cover w-full h-full max-w-[656px] max-h-[960px] select-none rounded-4xl"
        />

        <div className="max-w-[656px] bottom-8 bg-white h-auto p-10 absolute rounded-b-4xl">
          <Logo className="text-teal-700 h-8"/>
          <p  className="text-gray-700 font-medium text-xl mt-6">
            Gerencie suas finanças pessoais de uma forma simples com o fincheck, e o melhor, totalmente de graça!
          </p>
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
