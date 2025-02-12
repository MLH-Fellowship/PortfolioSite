import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Box, VStack, Heading, Text, Progress, UnorderedList, ListItem, useColorModeValue, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';

import { motion } from 'framer-motion';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { MeshBasicMaterial } from 'three';
import Navbar from '../Navbar';
import Footer from '../Footer';

const MotionBox = motion(Box);

const buttonVariants = {
  hover: { scale: 1.1 },
  tap: { scale: 0.9 },
};

function Model() {
  const ref = useRef();
  const colors = ['#ADD8E6', '#9DB2E1', '#8D8CDC', '#7D66D7', '#6D40D2', '#5C1ACD', '#4B00C9'];
  const color = colors[Math.floor(Math.random() * colors.length)];
  const [model, setModel] = useState();

  useEffect(() => {
    new GLTFLoader().load('/3D/puzzlePiece1.glb', (gltf) => {
      gltf.scene.traverse((child) => {
        if (child.isMesh) {
          child.material = new MeshBasicMaterial({ wireframe: true, color });
        }
      });
      setModel(gltf);
    });
  }, [])

  useFrame(() => {
    if (ref.current) {
      ref.current.position.y -= 0.1;
      if (ref.current.position.y < -50) ref.current.position.y = 100;
      ref.current.rotation.x += 0.01;
      ref.current.rotation.y += 0.01;
    }
  });

  return model ? <primitive object={model.scene} position={[Math.random() * 100 - 50, Math.random() * 100, Math.random() * 100 - 50]} ref={ref} /> : null;
}

function TimelineEvent({ date, event }) {
  return (
    <ListItem>
      <Text fontSize="xl" color={useColorModeValue("white", "white")}>{date}</Text>
      <Text color={useColorModeValue("white", "white")}>{event}</Text>
    </ListItem>
  );
}

function SkillBar({ skill, proficiency }) {
  return (
    <Box width="full">
      <Text fontSize="xl" color={useColorModeValue("white", "white")}>{skill}</Text>
      <Progress value={proficiency} colorScheme="purple" />
    </Box>
  );
}

function About() {
  const bgGradient = useColorModeValue("linear(to-br, #4b5178, #3a4062)", "linear(to-br, #4b5178, #3a4062)");

  return (
    <Box minHeight="100vh" display="flex" flexDirection="column" backgroundColor="#000000">
      <Navbar />

      <MotionBox
        flex="1"
        display="flex"
        alignItems="center"
        justifyContent="center"
        bgGradient={bgGradient}
        padding={4}
        animate={{ scale: [0.95, 1], opacity: [0, 1] }}
        transition={{ duration: 0.5 }}
      >
        <Canvas style={{ position: "absolute", zIndex: 1, background: "#000000" }}>
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          {[...Array(200)].map((_, i) => <Model key={i} />)}
        </Canvas>

        <Box
          zIndex={2}
          bg="#1a202c"
          p={5}
          rounded="xl"
          shadow="2xl"
          backdropFilter="blur(10px)"
          borderWidth={2}
          borderColor={useColorModeValue("#4b5178", "white")}
        >
          <Tabs colorScheme="purple" variant="soft-rounded" size="lg" isFitted>
            {/* <TabList>
              <Tab>About</Tab>
              <Tab>Experience</Tab>
              <Tab>Education</Tab>
              <Tab>Hobbies</Tab>
            </TabList> */}

            <TabPanels>
              <TabPanel>
                <VStack spacing={2} textAlign="center" maxW={'lg'}>
                  <Heading
                    fontSize="4xl"
                    fontWeight="bold"
                    lineHeight="tight"
                    letterSpacing={"-.1rem"}
                    color={useColorModeValue("white", "white")}
                  >
                    About Me
                  </Heading>
                  <Text
                    fontSize="xl"
                    color={useColorModeValue("white", "white")}
                  >
                    From building and racing electric vehicles to researching how AI can combat human trafficking, I am always seeking out new and innovative ways to make a meaningful difference. I have also had the honor of delivering award-winning speeches on the important topics of women in STEM and algorithmic bias. My track record of success speaks for itself, having held 8 leadership positions within the past year and continuously inspiring and motivating others towards a common goal.
                  </Text>
                </VStack>
              </TabPanel>

              {/* <TabPanel>
                <VStack spacing={6} alignItems="flex-start" maxW={'lg'}>
                  <Heading fontSize="2xl" color={useColorModeValue("white", "white")}>Work Experience</Heading>
                  <Box w="full" p={4} borderBottom="1px" borderBottomColor="whiteAlpha.600">
                    <Text mb="1" fontSize="xl" color={useColorModeValue("white", "white")}>Senior Software Developer at XYZ Corp</Text>
                    <Text mb="1" color={useColorModeValue("white", "white")}>2023-Present</Text>
                    <Heading mb="1" fontSize="md" color={useColorModeValue("white", "white")}>Responsibilities:</Heading>
                    <UnorderedList color={useColorModeValue("white", "white")}>
                      <ListItem mb="1">Lead a team of developers to maintain and enhance the company website</ListItem>
                      <ListItem mb="1">Implemented agile development methodologies to improve productivity</ListItem>
                    </UnorderedList>
                    <Heading mb="1" fontSize="md" color={useColorModeValue("white", "white")}>Achievements:</Heading>
                    <UnorderedList color={useColorModeValue("white", "white")}>
                      <ListItem mb="1">Redesigned the company website, increasing traffic by 30%</ListItem>
                      <ListItem mb="1">Developed an automated testing suite, reducing bugs by 15%</ListItem>
                    </UnorderedList>
                  </Box>

                  <Box w="full" p={4} borderBottom="1px" borderBottomColor="whiteAlpha.600">
                    <Text mb="1" fontSize="xl" color={useColorModeValue("white", "white")}>Software Developer at ABC Inc</Text>
                    <Text mb="1" color={useColorModeValue("white", "white")}>2020-2023</Text>
                    <Heading mb="1" fontSize="md" color={useColorModeValue("white", "white")}>Responsibilities:</Heading>
                    <UnorderedList color={useColorModeValue("white", "white")}>
                      <ListItem mb="1">Developed new features for the company's main product</ListItem>
                      <ListItem mb="1">Maintained the codebase, debugging and fixing issues</ListItem>
                    </UnorderedList>
                    <Heading mb="1" fontSize="md" color={useColorModeValue("white", "white")}>Achievements:</Heading>
                    <UnorderedList color={useColorModeValue("white", "white")}>
                      <ListItem mb="1">Improved product performance by 20% with optimization techniques</ListItem>
                      <ListItem mb="1">Received Employee of the Year award in 2022</ListItem>
                    </UnorderedList>
                  </Box>

                  <Box w="full" p={4}>
                    <Text mb="1" fontSize="xl" color={useColorModeValue("white", "white")}>Junior Software Developer at DEF Ltd</Text>
                    <Text mb="1" color={useColorModeValue("white", "white")}>2018-2020</Text>
                    <Heading mb="1" fontSize="md" color={useColorModeValue("white", "white")}>Responsibilities:</Heading>
                    <UnorderedList color={useColorModeValue("white", "white")}>
                      <ListItem mb="1">Worked in a team to develop and maintain several web applications</ListItem>
                      <ListItem mb="1">Contributed to code reviews and software design decisions</ListItem>
                    </UnorderedList>
                    <Heading mb="1" fontSize="md" color={useColorModeValue("white", "white")}>Achievements:</Heading>
                    <UnorderedList color={useColorModeValue("white", "white")}>
                      <ListItem mb="1">Contributed to a project that won the Best Software Design award</ListItem>
                      <ListItem mb="1">Improved application security, reducing security issues by 25%</ListItem>
                    </UnorderedList>
                  </Box>
                </VStack>
              </TabPanel>
              <TabPanel>
                <VStack spacing={6} alignItems="flex-start" maxW={'lg'}>
                  <Heading fontSize="2xl" color={useColorModeValue("white", "white")}>Education</Heading>
                  <Box w="full" p={4} borderBottom="1px" borderBottomColor="whiteAlpha.600">
                    <Text mb="1" fontSize="xl" color={useColorModeValue("white", "white")}>MSc in Computer Science, University of Example</Text>
                    <Text mb="1" color={useColorModeValue("white", "white")}>2016-2018</Text>
                    <Heading mb="1" fontSize="md" color={useColorModeValue("white", "white")}>Coursework:</Heading>
                    <UnorderedList color={useColorModeValue("white", "white")}>
                      <ListItem mb="1">Advanced Algorithms</ListItem>
                      <ListItem mb="1">Distributed Systems</ListItem>
                    </UnorderedList>
                  </Box>

                  <Box w="full" p={4} borderBottomColor="whiteAlpha.600">
                    <Text mb="1" fontSize="xl" color={useColorModeValue("white", "white")}>BSc in Computer Science, University of Example</Text>
                    <Text mb="1" color={useColorModeValue("white", "white")}>2012-2016</Text>
                    <Heading mb="1" fontSize="md" color={useColorModeValue("white", "white")}>Coursework:</Heading>
                    <UnorderedList color={useColorModeValue("white", "white")}>
                      <ListItem mb="1">Data Structures</ListItem>
                      <ListItem mb="1">Computer Networks</ListItem>
                    </UnorderedList>
                  </Box>
                </VStack>
              </TabPanel>
              <TabPanel>
                <VStack spacing={2} textAlign="center" maxW={'lg'}>
                  <Heading fontSize="2xl" color={useColorModeValue("white", "white")}>Hobbies</Heading>
                  <Text color={useColorModeValue("white", "white")}>I'm a chess enthusiast and have a 3D printer at home!</Text>
                  {/* Add more hobbies here */}
                {/* </VStack>
              // </TabPanel> */} 

            </TabPanels>
          </Tabs>
        </Box>
      </MotionBox>

      <Footer />
    </Box>
  );
}


export default About;

