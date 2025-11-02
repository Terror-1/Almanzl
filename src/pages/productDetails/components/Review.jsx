import ExpandableText from "../../../components/ExpandableText";
import Rating from "../../../components/Rating";

function Review({ review }) {
  return (
    <div className="my-5">
      <div className="flex items-center me-auto">
        <img
          src="https://t4.ftcdn.net/jpg/05/31/37/89/360_F_531378938_xwRjN9e5ramdPj2coDwHrwk9QHckVa5Y.jpg"
          alt="Reviewer Image"
          className="h-12 w-12 rounded-full object-cover"
        />
        <p className="ms-2 font-semibold">Ahmed Mohamed</p>
        <div className="h-0.5 w-0.5 rounded-full bg-black mx-2"></div>
        <p className="me-auto">22 Jul</p>
        <Rating size={20} readonly value={5} />
      </div>

      <ExpandableText
        maxLines={2}
        className="mt-2"
        children="KaiB was amazing with our cats!! 🌟🌟🌟 This was our first time using a
        pet-sitting service, so we were naturally quite anxious. We took a
        chance on Kai and completely lucked out! We booked Kai to come twice a
        day for three days. Kai spent a considerable amount of time playing and
        engaging with our cats. She also sent us very funny and detailed reports
        at the end of each session. She truly gave us peace of mind while on
        holiday, knowing our furbabies were in good hands. We also kept looking
        forward to her cute updates! You can tell she’s a natural with animals.
        I'd definitely book her again. Highly recommended!"
      />
    </div>
  );
}

export default Review;
