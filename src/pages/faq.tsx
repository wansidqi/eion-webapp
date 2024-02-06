import { Navigation } from "../layout";

export default function FAQ() {
    return (
        <>
            <Navigation />
            <div className="home-bg">
                <div className="bg-black bg-opacity-50 h-full px-5 py-4 text-justify">
                    <h1 className="deadjim text-xl">FREQUENTLY ASKED QUESTIONS</h1>
                    <div className="mt-4 text-base roboto-condensed">
                        <h3 className="text-base roboto-bold">Troubleshooting</h3>
                        <p className="mt-2">
                            If you are experiencing issues with authentication or the game and it's taking longer than expected, please try these troubleshooting steps:
                        </p>
                        <ul className="list-disc ml-4">
                            <li>
                                Clear your browser's caches, then refresh the page.
                            </li>
                            <li>
                                Try using incognito mode in your browser.
                            </li>
                            <li>
                                Attempt to access the game using a different web browser.
                            </li>
                            <li>
                                For further assistance, please contact our support team on our Discord channel at:
                                <br />
                                <a href="https://discord.gg/2RhyFBeXYZ" target="_blank" rel="noopener noreferrer" className="underline">
                                    https://discord.gg/2RhyFBeXYZ
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="mt-4 text-base roboto-condensed">
                        <h3 className="text-base roboto-bold">General</h3>
                        <ol className="list-decimal ml-4 mt-2 space-y-2">
                            <li>
                                How can I stay updated on Eion's developments?
                                <br />
                                <p className="mt-1">
                                    To stay informed about the latest updates, announcements, and changes in Eion, follow our official social media channels, join our Discord community, and visit our website regularly. We value your feedback and input!
                                </p>
                                <p>You can find us on discord at:</p>
                                <a href="https://discord.gg/2RhyFBeXYZ" target="_blank" rel="noopener noreferrer" className="underline">
                                    https://discord.gg/2RhyFBeXYZ
                                </a>
                            </li>
                            <li>
                                Is Eion free to play?
                                <br />
                                <p className="mt-1">
                                    Yes, Locker is a free-to-play game with in-game purchases available. You can enjoy the core gameplay without spending money, but there may be optional purchases for cosmetic items or to enhance your gaming experience.
                                </p>
                            </li>
                            <li>
                                How do you get cards?
                                <br />
                                <p className="mt-1">
                                    Cards are obtained through buying card packs.
                                </p>
                            </li>
                            <li>
                                What are the Card Rarities?
                                <br />
                                <p className="mt-1">
                                    Cards come in 4 rarities.  N(ormal), R(are), SR (Super Rare), and UR (Ultra Rare).
                                    <br />
                                    The percentages for each card rarity can be seen by clicking on the "Odds" tab.
                                </p>
                            </li>
                            <li>
                                Pack Types
                                <br />
                                <p className="mt-1">
                                    Right now there are three types of packs available: Standard Packs, Rate up Packs, and Team Packs.
                                </p>
                            </li>
                            <li>
                                Can I trade or sell player cards with other players?
                                <br />
                                <p className="mt-1">
                                    Currently, Eion does not support player-to-player trading or selling of cards. However, a marketplace is in the works.
                                </p>
                            </li>
                            <li>
                                How often are new player cards added to Eion?
                                <br />
                                <p className="mt-1">
                                    Cards are added on the week of player transfers that are announced. Players who are removed from the roster will become Legacy cards.
                                </p>
                            </li>
                            <li>
                                 What are Legacy Cards.
                                <br />
                                <p className="mt-1">
                                    Legacy cards are cards that are temporary disabled due to either players being removed from team, or going through balancing.
                                    <br/>
                                    They will be reactivated when available again, or stay as Legacy cards which can be used in future features in Eion.
                                </p>
                            </li>
                            <li>
                                What is the future roadmap for Eion?
                                <br />
                                <p className="mt-1">
                                    We have an exciting roadmap for Eion, including new features, game modes, and content updates. Stay connected with us through our communication channels to stay updated on our future plans and releases.
                                </p>
                            </li>
                            <li>
                                How do i collect the prizes?
                                <br />
                                <p className="mt-1">
                                    If you are at the top of the leaderboards, our team will contact you through your email to collect your particulars.
                                    <br/>
                                    Your privacy and security are of utmost importance to us, and we will handle your information with the strictest confidence.
                                </p>
                            </li>
                        </ol>
                    </div>
                    <div className="mt-4 text-base roboto-condensed">
                        <h3 className="text-base roboto-bold">Invoke</h3>
                        <ul className="list-decimal ml-4 mt-2 space-y-2">
                            <li>
                                What is the "Invoke"?
                                <br />
                                <p className="mt-1">
                                    Introducing Invoke, an exciting new feature on Eion where you can create your dream team of 5 players, from different regions, with each player fulfilling a unique in-game role. Points are awarded based on their daily in-game performance.
                                </p>
                                <p className="mt-2">
                                    After each match, Player Cards will have their cumulative K/D/A (Kills/Deaths/Assists) updated and points awarded based on:
                                    <br/>
                                    +100 points for appearing in a match<br/>
                                    +10 points for kills<br/>
                                    -10 points for deaths<br/>
                                    +5 points for assists.<br/>
                                </p>
                                <p className="mt-2">
                                    Scores will be updated at the end of the day. The goal is to identify the top Player Cards in the gold, roam, mid, jungle, and exp roles for the day.
                                </p>
                                <p className="mt-2">
                                    When Invoke is active, the draft you've submitted before the first game of the day determines the score you get. Any changes made during Invoke while it's live will only apply to the games of the next day.
                                </p>
                                <p className="mt-2">
                                    Your position on the Leaderboard determines your priority in selecting team rewards.
                                </p>
                                <p className="mt-2">
                                    Best of luck in assembling your 'Invoke' Dream Team, and may the strongest team emerge victorious!
                                </p>
                            </li>
                            <li>
                                When can I change my roster?
                                <br />
                                <p className="mt-1">
                                    You can change your roster 30mins after the last match of the day in Eion. The lock will commence again when the first match of the next day begins. This will also be indicated on the playmat of Invoke.
                                </p>
                            </li>
                        </ul>
                    </div>
                    <div className="mt-4 text-base roboto-condensed">
                        <h3 className="text-base roboto-bold">Locker</h3>
                        <ul className="list-decimal ml-4 mt-2 space-y-2">
                            <li>
                                What is Locker?
                                <br />
                                <p className="mt-1">
                                    Locker is a fantasy league card game set in the captivating world of EION, designed for fans of the popular mobile game, Mobile Legends: Bang Bang. In Locker, you can collect and strategize with player cards and Eion cards to create your ultimate dream team.
                                </p>
                            </li>
                            <li>
                                How do I play Locker?
                                <br />
                                <p className="mt-1">
                                    To play Locker, you collect player cards and eion cards in order to build a line up. You earn shards based on how well your line up does, and will be able to use shards to open more booster packs.
                                </p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}