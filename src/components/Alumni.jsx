/* Alumni page */
import SponsorWidget from './SponsorWidget';
import ProfileDisplay from './Alumni/ProfileDisplay/ProfileDisplay';

const Alumni = () => {
    return (
        <div 
            style={{ 
                fontFamily: 'Antonio',
                backgroundColor: '#003153',
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            <div style={{ paddingTop: '80px' }}>
                <header 
                    className="text-center py-8"
                >
                    <h1 className="text-[#F3E5AB] text-5xl mb-4 heading">Our Leadership Alumni</h1>
                    <p className="text-[#F9F6EE] text-3xl subheading">Celebrating the achievements of our alumni</p>
                </header>

                <main className="px-8 py-6">
                    <p className="text-[#F9F6EE] text-2xl baseText">
                        Welcome to the Alumni page! Here we showcase the incredible journeys and accomplishments of our alumni.
                    </p>
                    {/* Alumni cards or list will go here */}
                    <ProfileDisplay />
                </main>
            </div>

            {/* Push SponsorWidget to bottom */}
            <div className="mt-auto">
                <SponsorWidget />
            </div>
        </div>
    );
};

export default Alumni;