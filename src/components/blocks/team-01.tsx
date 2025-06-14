import {
  Github as GithubIcon,
  Linkedin as LinkedInIcon,
  X as XIcon,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

interface TeamProps {
  imageUrl: string;
  firstName: string;
  lastName: string;
  positions: string[];
  socialNetworks: SocialNetworkProps[];
}
interface SocialNetworkProps {
  name: string;
  url: string;
}

export default function Team01() {
  const teamList: TeamProps[] = [
    {
      imageUrl: "https://i.pravatar.cc/500?img=11",
      firstName: "Leo",
      lastName: "Miranda",
      positions: ["Vue Fronted Developer", "Creator Of This Website"],
      socialNetworks: [
        {
          name: "LinkedIn",
          url: "https://www.linkedin.com/",
        },
        {
          name: "Github",
          url: "https://github.com/",
        },
        {
          name: "X",
          url: "https://x.com",
        },
      ],
    },
    {
      imageUrl: "https://i.pravatar.cc/500?img=12",
      firstName: "Leo",
      lastName: "Miranda",
      positions: ["Vue Fronted Developer", "Creator Of This Website"],
      socialNetworks: [
        {
          name: "LinkedIn",
          url: "https://www.linkedin.com/",
        },
        {
          name: "Github",
          url: "https://github.com/",
        },
        {
          name: "X",
          url: "https://x.com",
        },
      ],
    },
    {
      imageUrl: "https://i.pravatar.cc/500?img=13",
      firstName: "Leo",
      lastName: "Miranda",
      positions: ["Vue Fronted Developer", "Creator Of This Website"],
      socialNetworks: [
        {
          name: "LinkedIn",
          url: "https://www.linkedin.com/",
        },
        {
          name: "Github",
          url: "https://github.com/",
        },
        {
          name: "X",
          url: "https://x.com",
        },
      ],
    },
    {
      imageUrl: "https://i.pravatar.cc/500?img=14",
      firstName: "Leo",
      lastName: "Miranda",
      positions: ["Vue Fronted Developer", "Creator Of This Website"],
      socialNetworks: [
        {
          name: "LinkedIn",
          url: "https://www.linkedin.com/",
        },
        {
          name: "Github",
          url: "https://github.com/",
        },
        {
          name: "X",
          url: "https://x.com",
        },
      ],
    },
    {
      imageUrl: "https://i.pravatar.cc/500?img=15",
      firstName: "Leo",
      lastName: "Miranda",
      positions: ["Vue Fronted Developer", "Creator Of This Website"],
      socialNetworks: [
        {
          name: "LinkedIn",
          url: "https://www.linkedin.com/",
        },
        {
          name: "Github",
          url: "https://github.com/",
        },
        {
          name: "X",
          url: "https://x.com",
        },
      ],
    },
    {
      imageUrl: "https://i.pravatar.cc/500?img=16",
      firstName: "Leo",
      lastName: "Miranda",
      positions: ["Vue Fronted Developer", "Creator Of This Website"],
      socialNetworks: [
        {
          name: "LinkedIn",
          url: "https://www.linkedin.com/",
        },
        {
          name: "Github",
          url: "https://github.com/",
        },
        {
          name: "X",
          url: "https://x.com",
        },
      ],
    },
    {
      imageUrl: "https://i.pravatar.cc/500?img=17",
      firstName: "Leo",
      lastName: "Miranda",
      positions: ["Vue Fronted Developer", "Creator Of This Website"],
      socialNetworks: [
        {
          name: "LinkedIn",
          url: "https://www.linkedin.com/",
        },
        {
          name: "Github",
          url: "https://github.com/",
        },
        {
          name: "X",
          url: "https://x.com",
        },
      ],
    },
    {
      imageUrl: "https://i.pravatar.cc/500?img=18",
      firstName: "Leo",
      lastName: "Miranda",
      positions: ["Vue Fronted Developer", "Creator Of This Website"],
      socialNetworks: [
        {
          name: "LinkedIn",
          url: "https://www.linkedin.com/",
        },
        {
          name: "Github",
          url: "https://github.com/",
        },
        {
          name: "X",
          url: "https://x.com",
        },
      ],
    },
  ];
  const socialIcon = (socialName: string) => {
    switch (socialName) {
      case "LinkedIn":
        return <LinkedInIcon />;
      case "Github":
        return <GithubIcon />;
      case "X":
        return <XIcon />;
    }
  };

  return (
    <section className="pb-20 pt-20 md:pb-32 md:pt-32 container">
      <div className="text-center space-y-4 pb-8 mx-auto">
        <Badge>TEAM</Badge>
        <h2 className="text-3xl font-bold sm:text-5xl tracking-tight">
          Meet the best team of AI
        </h2>
        <p className="text-xl text-muted-foreground pt-1">
          In a realm where imagination meets technology, our platform fosters
          innovation, inspires creativity
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {teamList.map(
          (
            { imageUrl, firstName, lastName, positions, socialNetworks },
            index
          ) => (
            <Card
              key={index}
              className="bg-muted/60 dark:bg-card pt-0 flex flex-col gap-3 h-full overflow-hidden group/hoverimg"
            >
              <CardHeader className="p-0 gap-0">
                <div className="h-full overflow-hidden">
                  <img
                    src={imageUrl}
                    alt=""
                    width={300}
                    height={300}
                    className="w-full aspect-square object-cover saturate-0 transition-all duration-200 ease-linear size-full group-hover/hoverimg:saturate-100 group-hover/hoverimg:scale-[1.01]"
                  />
                </div>
                <CardTitle className="pt-6 px-6">
                  {firstName}
                  <span className="text-primary ml-2">{lastName}</span>
                </CardTitle>
              </CardHeader>
              {positions.map((position, index) => (
                <CardContent
                  key={index}
                  className={`pb-0 text-muted-foreground ${
                    index === positions.length - 1 && "pb-6"
                  }`}
                >
                  {position}
                  {index < positions.length - 1 && <span>,</span>}
                </CardContent>
              ))}

              <CardFooter className="space-x-4 mt-auto">
                {socialNetworks.map(({ name, url }, index) => (
                  <Link
                    key={index}
                    href={url}
                    target="_blank"
                    className="hover:opacity-80 transition-all"
                  >
                    {socialIcon(name)}
                  </Link>
                ))}
              </CardFooter>
            </Card>
          )
        )}
      </div>
    </section>
  );
}
