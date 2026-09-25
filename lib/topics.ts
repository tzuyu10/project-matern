export const trimesters = [
  { id: "first", title: "1st trimester", months: "Months 1–3", monthsFilipino: "ika-1 hanggang ika-3 buwan", filipino: "Unang trimester ng pagbubuntis" },
  { id: "second", title: "2nd trimester", months: "Months 4–6", monthsFilipino: "ika-4 hanggang ika-6 na buwan", filipino: "Pangalawang trimester ng pagbubuntis" },
  { id: "third", title: "3rd trimester", months: "Months 7–9", monthsFilipino: "ika-7 hanggang ika-9 na buwan", filipino: "Pangatlong trimester ng pagbubuntis" },
];

export type Topic = {
  slug: string;
  title: string;
  description: string;
  preview: string;
  icon: string;
  stages: boolean;
  category: string;
  cardImage: string;
  coverImage?: string;
  contentImages: string[];
};

export const topics: Topic[] = [
  { slug: "prenatal-care", preview: "Regular na check-up para sa ligtas na pagbubuntis.", title: "Prenatal Care", description: "Kabilang ang regular na prenatal check-up, screening, at iba pang kinakailangang eksaminasyon.", icon: "heart", stages: true, category: "pregnancy", cardImage: "/media/topic-prenatal.webp", contentImages: ["/media/prenatal-first-checkups.webp", "/media/prenatal-first-food.webp", "/media/prenatal-second.webp", "/media/prenatal-third.webp"] },
  { slug: "childbirth", preview: "Paghahanda para sa pagdating ng iyong sanggol.", title: "Childbirth", description: "Proseso ng panganganak, mga pagpipilian sa panganganak, pain management, at paghahanda para sa panganganak.", icon: "baby", stages: true, category: "pregnancy", cardImage: "/media/topic-childbirth.webp", coverImage: "/media/childbirth-trimesters.webp", contentImages: [] },
  { slug: "postnatal-care", preview: "Pag-aalaga sa sarili at sanggol pagkatapos manganak.", title: "Postnatal Care", description: "Gabay tungkol sa pangangalaga pagkatapos manganak, pangangalaga sa sarili, pagpapasuso, at pag-aalaga sa bagong silang na sanggol.", icon: "flower", stages: false, category: "after-birth", cardImage: "/media/brand-mark.webp", contentImages: [] },
  { slug: "nutrition-lifestyle", preview: "Wastong pagkain at malusog na mga gawi.", title: "Nutrition & Lifestyle", description: "Wastong nutrisyon at mga inirerekomendang pagkain para sa mga buntis upang mapanatili ang kalusugan ng ina at sanggol.", icon: "leaf", stages: true, category: "wellbeing", cardImage: "/media/topic-nutrition.webp", contentImages: ["/media/nutrition-document.jpg"] },
  { slug: "family-planning", preview: "Mga pagpipilian sa pagpaplano ng iyong pamilya.", title: "Family Planning", description: "Mga paraan ng kontrasepsyon, pagpaplano ng pamilya, at kontrasepsyon pagkatapos manganak.", icon: "family", stages: false, category: "wellbeing", cardImage: "/media/brand-mark.webp", contentImages: ["/media/family-planning.webp"] },
  { slug: "health-education", preview: "Kilalanin ang mga senyales na nangangailangan ng tulong.", title: "Health Education", description: "Mga karaniwang suliranin sa kalusugan ng ina, mga senyales ng panganib, at kung kailan kinakailangang humingi ng medikal na tulong.", icon: "book", stages: true, category: "pregnancy", cardImage: "/media/topic-health-education.webp", contentImages: ["/media/health-first.webp", "/media/health-second.webp", "/media/health-third.webp"] },
  { slug: "emotional-support", preview: "Pag-unawa at pag-aalaga sa iyong emosyon.", title: "Emotional Support", description: "Mga pagbabagong emosyonal at mga paraan ng pagharap sa mga ito habang nagbubuntis at pagkatapos manganak.", icon: "smile", stages: true, category: "wellbeing", cardImage: "/media/topic-emotional-support.webp", contentImages: ["/media/emotional-first.webp", "/media/emotional-second.webp", "/media/emotional-third.webp"] },
  { slug: "provider-communication", preview: "Malinaw na pakikipag-usap sa iyong tagapagbigay ng pangangalaga.", title: "Healthcare Provider Communication", description: "Mga paraan tungo sa mabisang pakikipag-usap sa mga healthcare provider, kabilang ang wastong pagtatanong at pagpapahayag ng sariling pangangailangan at kalagayan sa kalusugan.", icon: "chat", stages: true, category: "support", cardImage: "/media/topic-provider-communication.webp", contentImages: ["/media/provider-document.jpg"] },
  { slug: "community-resources", preview: "Mga serbisyong makatutulong sa iyong komunidad.", title: "Community Resources", description: "Mga lokal na support service, maternity clinic, at iba pang serbisyong pangkalusugan para sa mga ina na makukuha sa komunidad.", icon: "community", stages: false, category: "support", cardImage: "/media/topic-community.webp", contentImages: ["/media/community-resources.webp"] },
  { slug: "record-keeping", preview: "Ayusin ang mahahalagang tala ng iyong kalusugan.", title: "Record Keeping", description: "Kahalagahan ng pagtatala ng mga prenatal appointment, resulta ng pagsusuri, bakuna, at iba pang mahalagang impormasyon tungkol sa kalusugan ng ina at sanggol.", icon: "record", stages: true, category: "support", cardImage: "/media/topic-record-keeping.webp", contentImages: ["/media/record-mother-baby-book.webp", "/media/record-prenatal-visit.webp", "/media/record-ultrasound.webp", "/media/record-referral.webp", "/media/record-lab-results.webp", "/media/record-immunization.webp"] },
];
