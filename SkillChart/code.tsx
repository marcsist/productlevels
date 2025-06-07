const { widget } = figma;
const {
  useSyncedState,
  useSyncedMap,
  usePropertyMenu,
  AutoLayout,
  Frame,
  Rectangle,
  Text,
  SVG,
} = widget;

import { levelDescriptions } from './levelinfo';

type Category = {
  name: string;
  color: string;
  skills: string[];
  skillDescriptions: string[];
};

const coreCategory = {
  name: "Core",
  color: "#007AA3",
  skills: [
    "Research",
    "Craft and delivery",
    "Strategy",
    "Leadership",
    "Impact",
    "Design Systems",
  ],
  skillDescriptions: [
    "User and market understanding",
    "Executing with quality",
    "Vision and planning",
    "Guiding others",
    "Delivering results",
    "Reusable patterns and components",
  ],
};

const productCategory = {
  name: "Product Design",
  color: "#0E8A16",
  skills: ["Domain Ownership", "User-Centered Problem Solving"],
  skillDescriptions: [
    "Deep knowledge of the product area",
    "Identifying and solving user problems",
  ],
};

const uiCategory = {
  name: "UI",
  color: "#9554CC",
  skills: ["Interaction Design & Prototyping", "Visual Design & Aesthetics"],
  skillDescriptions: [
    "Interactive patterns and prototyping",
    "Creating visually compelling experiences",
  ],
};

const contentCategory = {
  name: "Content Design",
  color: "#D56300",
  skills: ["Content Strategy & Messaging", "Content Quality & Operations"],
  skillDescriptions: [
    "Shaping product messaging",
    "Ensuring scalable, high-quality content",
  ],
};

const categories = [coreCategory, productCategory, uiCategory, contentCategory];
const TOTAL_LEVELS = 8
const LEVEL_HEIGHT = 650 / TOTAL_LEVELS

function Widget() {
  const voteMap = useSyncedMap<number>("skill-level")
  const [userLevel, setUserLevel] = useSyncedState<number>('level', 1)
  const [showLevels, setShowLevels] = useSyncedState<boolean>("isShown", false)
  const [role, setRole] = useSyncedState<string>("role", "Product Design")
  const roleOptions = [
    { option: "Product Design", label: "Product Design" },
    { option: "UI", label: "UI" },
    { option: "Content Design", label: "Content Design" }
  ]

  usePropertyMenu(
    [
      {
        itemType: 'dropdown',
        propertyName: 'roles',
        tooltip: 'Role',
        selectedOption: role,
        options: roleOptions,
      },
      {
        itemType: 'separator'
      },
      {
        itemType: 'action',
        tooltip: 'Show/hide levels',
        propertyName: 'levelToggle'
      }
    ],
    ({propertyName, propertyValue}) => {
      if (propertyName === "roles") {
        setRole(propertyValue)
      } else if (propertyName == "levelToggle") {
        setShowLevels(!showLevels);
      }
    },
  )
  return (
    <Frame
      name="Everything"
      width={3750}
      height={1100}
      fill="#FFFFFF"
      cornerRadius={10}
      effect={[
        {
          type: "drop-shadow",
          color: "#9747FF0A",
          offset: {
            x: 0,
            y: 3,
          },
          blur: 57,
          showShadowBehindNode:
            false,
        },
        {
          type: "drop-shadow",
          color: "#0D99FF0A",
          offset: {
            x: 0,
            y: 2,
          },
          blur: 30,
          showShadowBehindNode:
            false,
        },
        {
          type: "drop-shadow",
          color: "#14AE5C0A",
          offset: {
            x: 0,
            y: 1,
          },
          blur: 18,
          showShadowBehindNode:
            false,
        },
        {
          type: "drop-shadow",
          color: "#FFD54B0D",
          offset: {
            x: 0,
            y: 0,
          },
          blur: 6,
          showShadowBehindNode:
            false,
        },
      ]}
      stroke="#00000026"
      strokeWidth={3}
    >
      <Frame
        name="Dividers"
        x={82}
        y={228}
        width={3550}
        height={650}
      >
        {[...Array(TOTAL_LEVELS)].map((_, i) => {
          const lvl = TOTAL_LEVELS - i
          return (
            <Frame
              name={`Divider-L${lvl}`}
              opacity={0.1}
              y={650 - lvl * LEVEL_HEIGHT}
              strokeWidth={0}
              overflow="visible"
              hidden={showLevels ? true : false}
              width={3550}
              height={LEVEL_HEIGHT + 1}
              onClick={() => {
                setUserLevel(lvl)
              }}
              hoverStyle={{
                opacity: showLevels ? 0.1 : 0.5,
              }}
            >
              <Rectangle
                name={`Divider-L${lvl}-Bg`}
                y={0.5}
                fill="#FFF"
                width={150}
                height={LEVEL_HEIGHT}
              />
              <SVG
                name={`Divider-L${lvl}-Line`}
                height={3}
                width={3550}
                opacity={userLevel == lvl ? 1 : 1}
                src="<svg width='3481' height='4' viewBox='0 0 3481 4' fill='none' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' clip-rule='evenodd' d='M3481 3.50031L0 3.49969L0 0.499695L3481 0.500314L3481 3.50031Z' fill='black' fill-opacity='0.33'/></svg>"
              />
            </Frame>
          )
        })}
        <Text
          name="Level-Label"
          y={{
            type: "top",
            offset: 660 - userLevel * LEVEL_HEIGHT,
          }}
          hidden={showLevels ? true : false}
          fill="#A7A7A7"
          width={105}
          lineHeight="150%"
          fontFamily="Inter"
          letterSpacing={1.456}
          fontWeight={700}
        >
          CURRENT LEVEL ({userLevel})
        </Text>
        <SVG
          name="Divider-Line-Active"
          y={{
            type: "top",
            offset: 650 - userLevel * LEVEL_HEIGHT,
          }}
          hidden={showLevels ? true : false}
          height={3}
          width={3550}
          src="<svg width='3481' height='4' viewBox='0 0 3481 4' fill='none' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' clip-rule='evenodd' d='M3481 3.50031L0 3.49969L0 0.499695L3481 0.500314L3481 3.50031Z' fill='black' fill-opacity='0.33'/></svg>"
        />
      </Frame>
    <AutoLayout
      name="Container"
      verticalAlignItems={"center"}
      x={150}
      y={100}
      spacing={32}
      padding={64}
      cornerRadius={8}
      direction='vertical'
    >
      <AutoLayout
      name="Skills"
      overflow="visible"
      spacing={30}
      >
      {categories.map((category) => {
        // Draw Skill Rows
        return category.skills.map((skill, i) => {
          return Skill(
            skill,
            category.name,
            category.color,
            category.skillDescriptions[i],
            `${category.name}-${skill}`,
            role,
            showLevels,
            voteMap
          );
        });
      })}
      </AutoLayout>
      <AutoLayout
      name="Categories"
      overflow="visible"
      spacing={30}
      >
        {categories.map((category) => {
          // Draw Category Labels
          // console.log(`The category is ${category.name}`);
          return Category(
            category.name,
            category.color,
            role,
            `${category.name}`,
          );
        })}
      </AutoLayout>
      </AutoLayout>
    </Frame>
  );
}

function Category(
  name: string,
  color: string,
  role: string,
  category_key: string
) {
  // console.log('Category: ',name);
  // console.log('Role: ',role);
  const hideCategory = name !== "Core" && name !== role
  return (
      <Text
      name={ `Category-${name}` }
      key={ `Category-${category_key}` }
      hidden = { hideCategory ? true : false }
      fill= {color}
      width={810}
      height={50}
      verticalAlignText="center"
      horizontalAlignText="center"
      lineHeight="150%"
      fontFamily="Inter"
      fontSize={32}
      letterSpacing={1.536}
      textCase="upper"
      fontWeight={700}
      >
      {name}
      </Text>
  );
}

function Skill(
  name: string,
  category: string,
  color: string,
  skill_description: string,
  skill_key: string, // "Strategy-Product",
  role: string,
  showLevels: boolean,
  voteMap: SyncedMap
) {
  const offsetA = 734 - ((voteMap.get(skill_key) || 1) * LEVEL_HEIGHT)
  const activeOpacity = 0.8
  const hoverOpacity = 0.4
  const hideSkill = category !== "Core" && category !== role
  return (
    <Frame
      name={ `Skill-${name}` }
      key= { `Skill-${skill_key}` }
      hidden= { hideSkill ? true : false }
      width={250}
      height={716}
    >
        fill={color}
        cornerRadius={6}
        width={250}
        height={650}
      />
      {[...Array(TOTAL_LEVELS)].map((_, i) => {
        const lvl = TOTAL_LEVELS - i
        return (
          <Rectangle
            name={ `Skill-Block-${lvl}-${name}` }
            key={ `Skill-Block-${lvl}-${skill_key}` }
            opacity={ voteMap.get(skill_key) == `${lvl}` ? activeOpacity : 0 }
            y={{ type: "bottom", offset: lvl === 1 ? 0 : 1 }}
            fill={color}
            cornerRadius={6}
            width={250}
            height={LEVEL_HEIGHT * lvl}
            onClick={() => {
              voteMap.set(skill_key, lvl);
            }}
            hoverStyle={{ opacity: voteMap.get(skill_key) == `${lvl}` ? 1 : hoverOpacity }}
            tooltip={
              levelDescriptions.find(obj => obj.skill === name && obj.level === `${lvl}`)?.description
            }
          />
        )
      })}
      <Text
        name= { `Skill-Level-${name}` }
        key = { `Skill-Level-${skill_key}` }
        hidden= { showLevels ? true : false }
        opacity={ voteMap.get(skill_key)? 0.9 : 0 }
        y={{
          type: "top",
          offset: offsetA,
        }}
        fill= { (name == "Effectiveness" || name == "Leadership" || name == "Citizenship") ? "#876C14" : "#FFF" }
        width={250}
        height={38}
        horizontalAlignText="center"
        lineHeight="150%"
        fontFamily="Inter"
        fontSize={24}
        letterSpacing={-0.456}
        fontWeight={700}
      >
        L{(voteMap.get(skill_key) || 1)}
      </Text>
      <Text
        name= { `Skill-Label-${name}` }
        key = { `Skill-Label-${skill_key}` }
        fill={color}
        width={250}
        height={50}
        verticalAlignText="center"
        horizontalAlignText="center"
        lineHeight="150%"
        fontFamily="Inter"
        fontSize={32}
        letterSpacing={-0.32}
        fontWeight={700}
        strokeWidth={1.391}
        tooltip={ `${skill_description}` }
      >
        {name}
      </Text>
    </Frame>
  );
}

widget.register(Widget);