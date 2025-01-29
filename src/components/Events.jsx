/* Events page */
import { useState, useEffect } from 'react';
import eventsData from './Events/eventsData';
import { EventsDisplay, Filter } from './Events/events';
import SponsorWidget from './SponsorWidget';
import {PRUSSIAN_BLUE, VANILLA, BONE_WHITE} from './Events/colors.js';

const Events = () => {
    const [filter, setFilter] = useState('all');
    const [filteredEvents, setFilteredEvents] = useState(eventsData);
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Instagram feed fetch with the provided token
    useEffect(() => {
        const fetchInstagramPosts = async () => {
            const INSTAGRAM_TOKEN = 'IGQWROX3F5QVpqM1NWNERWVWhKdmQxMTU3ZAkZA4QzU1cnI0YU9iUWhYSGlqZAHdPeGJ1TGI2MzVJWGlBQlFWSE9JQmduc3hkM3ZAFV1VzLXVudzJhZAVlaOVYzWTlsRUNuLVZAIN2tBU3dqS05lWjlqMDRMRU9qT1hucFkZD';
            
            try {
                const response = await fetch(
                    `https://graph.instagram.com/me/media?fields=id,caption,media_url,permalink&access_token=${INSTAGRAM_TOKEN}`
                );

                console.log("Got a response from the API! Need to check if this response is OK!");
                
                if (!response.ok) {
                    throw new Error('Failed to fetch Instagram posts');
                }

                console.log("Data received is OK! Time to convert data into JSON format!");
                
                const data = await response.json();
                console.log('Instagram data:', data); // For debugging
                setPosts(data.data?.slice(0, 6) || []);
            } catch (err) {
                console.error('Error fetching Instagram posts:', err);
                setError('Unable to load Instagram feed');
            } finally {
                setIsLoading(false);
            }
        };

        fetchInstagramPosts();
    }, []);

    // Events filter
    useEffect(() => {
        const now = new Date();
        const filtered = (() => {
            switch (filter) {
                case 'past':
                    return eventsData.filter((event) => new Date(event.date) < now);
                case 'upcoming':
                    return eventsData.filter((event) => new Date(event.date) >= now);
                case 'project':
                    return eventsData.filter((event) => event.type === 'Project Meeting');
                case 'general':
                    return eventsData.filter((event) => event.type === 'General Meeting');
                case 'guest':
                    return eventsData.filter((event) => event.type === 'Guest Speaker Talks');
                case 'social':
                    return eventsData.filter((event) => event.type === 'Social Event');
                default:
                    return eventsData;
            }
        })();

        setFilteredEvents(filtered);
    }, [filter]);

    return (
        <>
            <div style={{backgroundColor: PRUSSIAN_BLUE}} className="min-h-screen pt-10 pb-4">
                <h1 style={{color: VANILLA, lineHeight: "125%", letterSpacing: "0.02em"}} className="text-6xl font-bold text-center pt-3 heading">
                    See what Longhorn Neurotech is Up To!
                </h1>

                {/* Instagram Feed Section */}
                <div className="max-w-[1400px] mx-auto px-4 my-8 hidden">
                    <h2 style={{color: BONE_WHITE}} className="text-4xl font-bold mb-4 subheading">Recent News</h2>
                    <div className="bg-white rounded-lg p-6 overflow-hidden min-h-[400px]">
                        {isLoading ? (
                            <div className="flex justify-center items-center h-[300px]">
                                <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent"></div>
                            </div>
                        ) : error ? (
                            <div className="text-gray-500 text-center py-8">
                                {error}
                            </div>
                        ) : posts.length > 0 ? (
                            <div className="overflow-x-auto">
                                <div className="flex gap-4 pb-4 min-w-min">
                                    {posts.map(post => (
                                        <a 
                                            key={post.id}
                                            href={post.permalink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-shrink-0 group"
                                        >
                                            <div className="relative w-[300px] h-[300px] overflow-hidden rounded-lg">
                                                <img
                                                    src={post.media_url}
                                                    alt={post.caption || 'Instagram post'}
                                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                                />
                                                {post.caption && (
                                                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                        <p className="text-white text-sm line-clamp-2">
                                                            {post.caption}
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="text-gray-500 text-center py-8">
                                No posts to display
                            </div>
                        )}
                    </div>
                </div>

                {/* Events Section */}
                <div className="flex flex-col items-center max-w-[1400px] mx-auto my-8 px-4">
                    <div className="flex flex-row items-center justify-between w-full mb-4">
                        <h2 style={{color: BONE_WHITE}} className="text-5xl font-bold subheading">Events</h2>
                        <Filter setFilter={setFilter} />
                    </div>
                    <EventsDisplay events={filteredEvents} />
                </div>
            </div>

            <SponsorWidget />
        </>
    );
};

export default Events;