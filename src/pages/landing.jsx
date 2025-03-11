import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import companies from "../data/companies.json";
import faqs from "../data/faq.json";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Link } from "react-router-dom";
import Wrapper from "@/components/Wrapper";
import Container from "@/components/Container";
import { ArrowRight } from "lucide-react";

const LandingPage = () => {
  return (
    <main className="flex flex-col items-center w-full">
      <section className="w-full relative flex items-center justify-center flex-col px-4 md:px-0 py-8">
        <Wrapper>
      <div className="absolute inset-0 dark:bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[linear-gradient(to_right,#161616_1px,transparent_1px),linear-gradient(to_bottom,#161616_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] -z-10 h-[150vh]" />

          <Container >
            <div className="flex flex-col items-center justify-center py-20 h-full ">
              <button className="group relative grid overflow-hidden rounded-full px-4 py-1 shadow-[0_1000px_0_0_hsl(0_0%_20%)_inset] transition-colors duration-200">
                <span>
                  <span className="spark mask-gradient absolute inset-0 h-[100%] w-[100%] animate-flip overflow-hidden rounded-full [mask:linear-gradient(white,_transparent_20%)] before:absolute before:aspect-square before:w-[200%] before:rotate-[-90deg] before:animate-rotate before:bg-[conic-gradient(from_0deg,transparent_0_340deg,white_360deg)] before:content-[''] before:[inset:0_auto_auto_50%] before:[translate:-50%_-15%]" />
                </span>
                <span className="backdrop absolute inset-[1px] rounded-full bg-neutral-950 transition-colors duration-200 group-hover:bg-neutral-900" />
                <span className="h-full w-full blur-md absolute bottom-0 inset-x-0 bg-gradient-to-tr from-primary/40"></span>
                <span className="z-10 py-0.5 text-sm text-neutral-100 flex items-center justify-center gap-1.5">
                  ✨ Introducing Kelsa
                  {/* < className="w-4 h-4" /> */}
                </span>
              </button>
              {/* <h1 className="flex flex-col items-center justify-center gradient-title font-extrabold text-4xl sm:text-6xl lg:text-6xl tracking-tighter py-4">
                Find Your Dream Job
              </h1>
              <p className=" sm:mt-4 text-xs sm:text-xl mb-6 text-center">
                Explore thousands of job listings or find the perfect candidate
              </p>
              <div className="flex gap-6 justify-center">
                <Link to={"/jobs"}>
                  <Button variant="default" size="xl">
                    Find Jobs
                  </Button>
                </Link>
                <Link to={"/post-job"}>
                  <Button variant="destructive" size="xl">
                    Post a Job
                  </Button>
                </Link>
              </div> */}
              <div className="flex flex-col items-center mt-8 max-w-3xl w-11/12 md:w-full z-[10]">
                <h1 className="text-4xl md:text-6xl lg:textxl md:!leading-snug font-semibold text-center ">
                  Find Your Dream Job
                </h1>
                <p className="text-base md:text-lg text-foreground/80 mt-6 text-center">
                  Explore thousands of job listings or find the perfect candidate
                </p>
                <div className="hidden md:flex relative items-center justify-center mt-8 md:mt-12 w-full">
                  <Link
                    to="/jobs"
                    className="flex items-center justify-center w-max rounded-full border-t border-foreground/30 bg-white/20 backdrop-blur-lg px-2 py-1 md:py-2 gap-2 md:gap-8 shadow-3xl shadow-background/40 cursor-pointer select-none"
                  >
                    <p className="text-foreground text-sm text-center md:text-base font-medium pl-4 pr-4 lg:pr-0">
                      ✨ {"  "}Start finding jobs thet can change your life today!
                    </p>
                    <Button
                      size="sm"
                      className="rounded-full hidden lg:flex border border-foreground/20"
                    >
                      <Link to="/jobs">
                       Find Jobs
                      </Link>
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

          </Container>
        </Wrapper>


      <Wrapper>
        <Carousel
          plugins={[
            Autoplay({
              delay: 2000,
            }),
          ]}
          className="w-full py-10"
        >
          <CarouselContent className="flex gap-5 sm:gap-20 items-center">
            {companies.map(({ name, id, path }) => (
              <CarouselItem key={id} className="basis-1/3 lg:basis-1/6 ">
                <img
                  src={path}
                  alt={name}
                  className="h-9 sm:h-14 object-contain"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </Wrapper>

      {/* <img src="/banner.jpeg" className="w-full" /> */}
        <Wrapper className="flex flex-col items-center justify-center py-12 relative">
          <Container>
            <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="font-bold">For Job Seekers</CardTitle>
                </CardHeader>
                <CardContent>
                  Search and apply for jobs, track applications, and more.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="font-bold">For Employers</CardTitle>
                </CardHeader>
                <CardContent>
                  Post jobs, manage applications, and find the best candidates.
                </CardContent>
              </Card>
            </section>

          </Container>

        </Wrapper>
        <Wrapper className="flex flex-col items-center justify-center py-12 relative">
          <Container>
            <Accordion type="multiple" className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index + 1}`}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

          </Container>

        </Wrapper>

    


      </section>
    </main>
  );
};

export default LandingPage;
