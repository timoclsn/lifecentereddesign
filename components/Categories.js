import Button from '@/components/Button';
import CategoryCard from '@/components/CategoryCard';

export default function Categories() {
    return (
        <section>
            <h2 className="mb-4 font-bold">What we plan to do here:</h2>
            <div className="mb-20 gap-14 columns-1 sm:columns-2 lg:columns-3">
                <CategoryCard
                    headline="Information"
                    text="We plan to provide you with theoretical and practical information around life-centered design through this website."
                    bgColor="bg-oak"
                />
                <CategoryCard
                    headline="Podcast"
                    text="We are planning to host a podcast, where inspiring guests would be interviewed around life-centered design and related topics. "
                    bgColor="bg-grass"
                />
                <CategoryCard
                    headline="Job Board"
                    text="We are considering building a job board  – a place where you can find and offer jobs with a life-centered design focus."
                    bgColor="bg-sky"
                />
                <CategoryCard
                    headline="News"
                    text="Interesting news around the topic of life-centered design – like new articles, upcoming events, book releases, and more – are also supposed to be part of Life Centered Design.Net"
                    bgColor="bg-morning"
                />
                <CategoryCard
                    headline="Community"
                    text="We consider creating a community, where everyone interested in life-centered design can have inspiring conversations, share best practices, and co-create content around this fascinating topic."
                    bgColor="bg-evening"
                />
                <CategoryCard
                    headline="Resources"
                    text="We would like to provide the visitors of this website with helpful resources around life-centered design and related fields. Included might be:"
                    list={[
                        'Books',
                        'Podcasts/podcast episodes',
                        'Articles',
                        'Tools',
                        'And more…'
                    ]}
                    bgColor="bg-sand"
                />
                <CategoryCard
                    headline="Events"
                    text="To bring the conversations around life-centered design to life we would love to host events and make them available through this website."
                    bgColor="bg-forest"
                />
            </div>
            <div className="flex flex-col items-center space-y-10">
                <p className="max-w-md mx-auto text-center text-dark">
                    We are still evaluating these ideas and the general concept.
                    If you are interested, please signup for our newsletter and
                    consider letting us know what ideas you like most.
                </p>
                <Button
                    text="Newsletter signup"
                    size="l"
                    href="http://eepurl.com/htoWRr"
                    target="_blank"
                    secondary
                    bgColor="bg-grass"
                />
            </div>
        </section>
    );
}
