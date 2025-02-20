"use client";
import { Layout } from "@/_components/shared/ui/layout";
import { Button } from "@/_components/shared/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import aos from "aos";

export const Hero = () => {
  useEffect(() => {
    aos.init({
      once: true,
      mirror: false,
      offset: 50,
      duration: 2000,
    });
  }, []);
  return (
    <Layout className="mt-5 lg:mt-20 overflow-hidden">
    <Image
      src="/shoes/alesari-our-story-shoes-unique-1.jpg"
      alt="Alesari shoes"
      width={0}
      height={0}
      sizes="80vw"
      className="w-full"
     />  
   
 
  
   <h1
  data-aos="fade-left"
  className="mt-20 font-sans text-2xl font-bold uppercase text-center"
  style={{ textDecoration: 'none' }}
>
  The Art of Alesari
</h1>



<div data-aos="fade-up">
  <p
    className="mt-10 font-sans text-[1.2rem]"
    style={{ textAlign: 'justify' }}
  >
    Introducing Alesari – where opulence meets innovation, and{" "}
    every step is a statement. This avant-garde luxury
    footwear brand is poised to redefine elegance with a daring fusion of
    precious materials – leather, gold, carbon, and porcelain.
    For over five years, Alesari has dedicated itself to perfecting its
    craft, tirelessly honing each detail to create a product that
    transcends mere footwear. Every shoe boasts a{" "}
    24K gold-plated sole, enveloped in sumptuous{" "}
    natural leather both inside and out. But it's not
    just about luxury; it's about pushing boundaries. That's why Alesari
    incorporates a carbon fiber heel and insole, a feat
    of engineering and elegance unmatched by any other shoemaker in the
    world. Each pair is a testament to the brand's unwavering commitment
    to excellence.
    The brand's philosophy revolves around:
  </p>
</div>

 
      <h1
   data-aos="fade-left"
   className="mt-10 font-sans text-2xl font-bold  text-center"
   style={{ textDecoration: 'none' }}
>
Transforming the ordinary into extraordinary
</h1>
<div className="mt-20 grid grid-cols-2 place-items-center gap-20 relative">
  <div className="col-span-2 lg:col-span-1" data-aos="fade-down" style={{ position: 'relative', top: '-20px' }}>
    <p
      className="font-sans text-[1.2rem]"
      style={{ textAlign: 'justify' }}
    >
      Exemplified through its meticulously crafted high heels that double as
      wearable masterpieces.
      For the modern fashionista seeking a blend of strength and style,
      Alesari offers high heels forged from lightweight carbon fiber.{" "}
      <br />
      This innovative material not only ensures durability but also
      creates an ethereal weightlessness, allowing wearers to dance
      through life with unparalleled grace.
      Drawing inspiration from the delicate beauty of porcelain, these heels are a
      harmonious blend of fragility and strength.
      Each pair is a work of art, with flowers
      intricately handcrafted by skilled Zsolnay artisans who breathe life
      into the porcelain, making it as resilient as it is elegant.
      <br />
      Each meticulously crafted pair of shoes represents the pinnacle of
      artisanal craftsmanship, with{" "}
      only 70 pairs available worldwide per model,
      ensuring a level of exclusivity unparalleled in the luxury fashion
      realm.
    </p>         
  </div>

  <div className="col-span-2 lg:col-span-1 max-lg:row-start-1">
    <Image
      data-aos="fade-up"
      src="/shoes/alesari_nova.jpg"
      alt="Alesari shoes"
      width={0}
      height={0}
      sizes="80vw"
      className="w-full object-contain"
    />
  </div>
</div>

      <h1
    data-aos="fade-left"
    data-aos-delay="400" 
    className="mt-20 font-sans text-2xl font-bold  text-center"
    style={{ textDecoration: 'none' }}
>
But the Alesari experience doesn't end with the shoes themselves
</h1>
      <div className={`mt-20 grid grid-cols-2 place-items-center gap-20`}>
        <div className={`col-span-2 lg:col-span-1`}>
          <Image
            data-aos={`zoom-in`}
            src={`/shoes/alesari4.jpg`}
            alt={`Alesari box`}
            width={0}
            height={0}
            sizes={`80vw`}
            className={`w-full`}
          />
        </div>
        <div className="col-span-2 lg:col-span-1">
  <p
    className="font-sans text-[1.2rem]"
    data-aos="zoom-out"
    style={{ textAlign: 'justify' }}
  >
    With each order, customers embark on a journey—a journey of
    anticipation, surprise, and unparalleled luxury. Unveil your coveted
    pair of Alesari shoes nestled within a wooden box,
    exuding sophistication and timeless elegance. Lined with plush in
    various captivating colors, each box promises a delightful surprise
    as we meticulously select the perfect hue to complement your chosen
    style.
    <br />
    Inside the wooden box, nestled amidst layers of plush, lies the
    embodiment of craftsmanship and luxury.
  </p>
</div>

      </div>
      <div className="grid grid-cols-2 place-items-center gap-20 max-lg:mt-10">
  <div className="col-span-2 lg:col-span-1">
    <p
      className="font-sans text-[1.2rem]"
      data-aos="zoom-out"
      style={{ textAlign: 'justify' }}
    >
      But our commitment to
      safeguarding your precious purchase goes beyond aesthetics. Encased
      within the wooden box lies a carbon fiber box, also
      ensconced in plush, designed to facilitate seamless transportation
      during your travels. Crafted from the same material as your shoe
      heels, this carbon fiber box ensures not only durability but also a
      harmonious alignment with the essence of your footwear.
      <br />
      With Alesari, every unboxing is an experience to savor, where luxury
      meets practicality, and anticipation meets delight. Elevate your
      journey with our meticulously crafted shoe box, because your footwear
      deserves nothing less than the extraordinary.
    </p>
  </div>


        <div className={`col-span-2 lg:col-span-1 max-lg:mt-10`}>
          <Image
            data-aos={`zoom-in`}
            src={`/shoes/alesari6.jpg`}
            alt={`Alesari box`}
            width={0}
            height={0}
            sizes={`80vw`}
            className={`w-full`}
          />
        </div>
      </div>


      
      <p
  className="mt-10 font-sans text-[1.2rem]"
  data-aos="fade-up"
  style={{ textAlign: 'justify' }}
>
  Alesari doesn't just offer footwear; it presents an experience, an
  embodiment of luxury that transcends the ordinary. As the first
  collection whispers tales of sophistication and glamour, it invites
  fashion enthusiasts into a realm where high heels are not just
  accessories but a celebration of individuality, strength, and
  unparalleled beauty. 
</p>

<h1
data-aos="fade-left"
data-aos-delay="1000" 
className="mt-20 font-sans text-2xl font-bold  text-center"
style={{ textDecoration: 'none' }}
>
Step into the extraordinary with Alesari where luxury 
<br />
is not just worn - it's lived.
</h1>
    </Layout>
  );
};
