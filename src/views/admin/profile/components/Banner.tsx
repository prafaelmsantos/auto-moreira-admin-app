import avatar from '../../../../assets/img/avatars/avatar7.png';
import banner from '../../../../assets/img/auth/back.jpg';
import Card from '../../../../components/card';

const Banner = () => {
  return (
    <Card extra={'items-center w-full h-full p-[16px] bg-cover'}>
      {/* Background and profile */}
      <div
        className="relative mt-1 flex h-40 w-full justify-center rounded-xl bg-cover"
        style={{ backgroundImage: `url(${banner})` }}
      >
        <div className="absolute -bottom-12 flex h-[87px] w-[87px] items-center justify-center rounded-full border-[4px] border-white bg-pink-400 dark:!border-navy-700">
          <img className="h-full w-full rounded-full" src={avatar} alt="" />
        </div>
      </div>

      {/* Name and position */}
      <div className="mt-16 flex flex-col items-center">
        <h4 className="text-xl font-bold text-navy-700 dark:text-white">
          Rafael Santos
        </h4>
        <p className="text-base font-normal text-gray-600">Product Manager</p>
      </div>
    </Card>
  );
};

export default Banner;
