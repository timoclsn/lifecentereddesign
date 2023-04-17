import {
  RedirectToSignIn,
  SignedIn,
  SignedOut,
  UserProfile,
  useAuth,
} from '@clerk/nextjs';
import {
  UilCheckCircle,
  UilExclamationTriangle,
  UilSpinnerAlt,
  UilTimesCircle,
} from '@iconscout/react-unicons';
import { Layout } from 'components/Layout';
import { Button, Heading, InfoBox } from 'design-system';
import { trpc } from 'utils/trpc';

const ProfilePage = () => {
  const { signOut } = useAuth();
  const utils = trpc.useContext();
  const { mutate, isLoading, isSuccess, isError } =
    trpc.user.delete.useMutation({
      onSuccess: () => {
        utils.resources.likes.invalidate();
        signOut();
      },
    });

  return (
    <Layout title="Profile" slug="profile">
      <section className="mx-auto max-w-4xl">
        <Heading level="1" className="mb-8">
          Profile
        </Heading>
        <SignedIn>
          <div className="flex flex-col items-center justify-center gap-10">
            <UserProfile
              appearance={{
                variables: {
                  colorPrimary: '#101b2c',
                  borderRadius: 'none',
                },
                elements: {
                  card: 'shadow-none',
                },
              }}
            />
            <div className="flex flex-col items-center justify-center gap-10">
              <Button
                color="danger"
                onClick={() => {
                  if (
                    window.confirm(
                      "Do you really want to delete your account? This action can't be undone."
                    )
                  ) {
                    mutate();
                  }
                }}
                disabled={isLoading}
              >
                {isLoading ? (
                  <UilSpinnerAlt className="animate-spin" />
                ) : (
                  <UilTimesCircle />
                )}
                Delete account
              </Button>

              {isSuccess && (
                <InfoBox
                  variant="success"
                  icon={<UilCheckCircle />}
                  className="animate-in zoom-in-0 fade-in duration-150 ease-in-out"
                >
                  Succesfully deleted your account! We are sad to see you go.
                </InfoBox>
              )}

              {isError && (
                <InfoBox
                  variant="error"
                  icon={<UilExclamationTriangle />}
                  className="animate-in zoom-in-50 fade-in duration-150 ease-in-out"
                >
                  Something went wrong while deleting your account. Please try
                  again or contact us at hello@lifecentereddesign.net.
                </InfoBox>
              )}
            </div>
          </div>
        </SignedIn>
        <SignedOut>
          <RedirectToSignIn />
        </SignedOut>
      </section>
    </Layout>
  );
};

export default ProfilePage;
