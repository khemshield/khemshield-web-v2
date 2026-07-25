import LoginForm from "./LoginForm";

type Props = { searchParams: { next?: string } };

const StudioLoginPage = ({ searchParams }: Props) => (
  <div className="mx-auto max-w-sm rounded-xl border border-gray-200 bg-white p-8">
    <h1 className="text-xl font-semibold text-secondary-normal">Sign in</h1>
    <p className="mb-6 mt-1 text-sm text-gray-500">
      Enter the studio passphrase from web/.env.local.
    </p>
    <LoginForm next={searchParams.next} />
  </div>
);

export default StudioLoginPage;
