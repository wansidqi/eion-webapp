export function Odds({ oddImg, packName }: { oddImg: string | undefined; packName: string | undefined; }) {
  return (
    <>
      {oddImg ? (
        <div className="bg-[#242424]">
          <img src={oddImg} alt={packName} className="" />
        </div>
      ) : (
        <p className="my-4 py-4 px-2">Coming Soon . . .</p>
      )}
    </>
  );
}

// const card = [
//   {
//     name: 'Leader Card',
//     description: '0.01% AA, 0.6% Gold',
//     variation: [
//       {
//         name: 'King of the Jungle',
//         description: '2.50%',
//       },
//       {
//         name: 'The Protector',
//         description: '2.08%',
//       },
//       {
//         name: 'Hawk-Eye',
//         description: '2.08%',
//       },
//       {
//         name: 'The Duelist',
//         description: '2.08%',
//       },
//     ],
//   },
//   {
//     name: 'Player Card',
//     description: '0.6% Gold',
//     variation: [
//       {
//         name: 'King of the Jungle',
//         description: '2.50%',
//       },
//       {
//         name: 'The Protector',
//         description: '2.08%',
//       },
//       {
//         name: 'Hawk-Eye',
//         description: '2.08%',
//       },
//       {
//         name: 'The Duelist',
//         description: '2.08%',
//       },
//     ],
//   },
//   {
//     name: 'Skill Card',
//     description: '0.6% Gold, 5% Silver',
//     variation: [
//       {
//         name: 'King of the Jungle',
//         description: '2.50%',
//       },
//       {
//         name: 'The Protector',
//         description: '2.08%',
//       },
//       {
//         name: 'Hawk-Eye',
//         description: '2.08%',
//       },
//       {
//         name: 'The Duelist',
//         description: '2.08%',
//       },
//     ],
//   },
//   {
//     name: 'Support Card',
//     description: '5% Silver',
//     variation: [
//       {
//         name: 'King of the Jungle',
//         description: '2.50%',
//       },
//       {
//         name: 'The Protector',
//         description: '2.08%',
//       },
//       {
//         name: 'Hawk-Eye',
//         description: '2.08%',
//       },
//       {
//         name: 'The Duelist',
//         description: '2.08%',
//       },
//     ],
//   },
// ];


// import odds from '/assets/images/Store/odds.jpg';


// export function Odds() {
//   return (
//     <div className="bg-[#242424]">
//       <div className="relative  flex items-center justify-between linear-bg2 px-3 py-2 pl-1">
//         <p className="px-4">Pack Odds</p>
//       </div>
//       <div className="flex flex-wrap">
//         <div className="roboto my-2 flex max-h-[600px] w-full flex-col overflow-y-scroll p-4 text-[14px]">
//           <div className="my-2">Every card drawn has a chance to be of a higher rarity:</div>
//           <div>
//             {card.map(cards => (
//               <>
//                 <div className="my-1 flex flex-row justify-between bg-[#1C3A7E] p-2 text-white">
//                   <div>{cards.name}</div>
//                   <div>{cards.description}</div>
//                 </div>
//               </>
//             ))}
//           </div>
//           <div className="my-2">Odds of each card in the booster pack:</div>
//           <div className="font-bold">UTILITY CARDS (70% of card pool)</div>
//           <div>
//             {card.map((cards, index) => (
//               <div className="my-4" key={index}>
//                 <h3>{cards.name}</h3>
//                 {cards.variation && (
//                   <div>
//                     {cards.variation.map((variationItem, variationIndex) => (
//                       <div
//                         className="my-1 flex flex-row justify-between bg-[#606060] p-2 text-white"
//                         key={variationIndex}
//                       >
//                         <div>{variationItem.name}</div>
//                         <div>{variationItem.description}</div>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
