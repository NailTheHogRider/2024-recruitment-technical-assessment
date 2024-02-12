import styled from 'styled-components';
import logoImage from './assets/unilectives.svg';
import {
  BookOpenIcon,
  ShieldCheckIcon,
  UserCircleIcon,
  BarsArrowUpIcon,
  MoonIcon,
  ArrowRightEndOnRectangleIcon,
  MagnifyingGlassIcon
} from "@heroicons/react/24/outline";
import { useState } from "react";
import initialCoursesData from './courses.json';

/*
interface CourseType {
  course_prefix: string;
  course_code: number;
  course_title: string;
  average_stars: number;
  total_reviews: number;
  offered_terms: string[];
}
*/

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: row;
`

const SideBar = styled.div`
  background-color: #f9fafb;
  height: 100vh;
  width: 4.5vw;
  position: fixed;
  top: 0;
  left: 0;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Logo = styled.img`
  padding-top: 2vh;
  width: 2vw;
  height: auto;
  cursor: pointer;
  padding-bottom: 3vh;
`

const GrayLine = styled.div`
  width: 55%;
  height: 0;
  border-top: 2px solid #e5e7ea;
  padding-top: 2vh;
`

const IconBox = styled.div`
  width: 1.5vw;
  height: auto;
  cursor: pointer;
  padding: 10px;
  border-radius: 10px;

  &:hover {
    background-color: #e3e8ef;
    transition: background-color 0.3s;
  }
`

const PaddingBox1 = styled.div`
  padding: 1vh;
`

const PaddingBox2 = styled.div`
  padding: 22vh;
`

const MainContent = styled.div`
  margin-left: 12vw;
  width: calc(100vw - 4.5vw);
  display: flex;
  flex-direction: column;
  background-color: #fdfdfd;
`

const DevSocPresents = styled.div`
  font-family: 'TT Commons Pro Variable','Segoe UI','Arial',sans-serif;
  margin-top: 1.5vh;
`

const Title = styled.h1`
  font-family: 'TT Commons Pro Variable','Segoe UI','Arial',sans-serif;
  font-size: 4.3rem;
  line-height: 1;
  color: #3877ea;
  font-weight: 700; 
  margin-top: 1vh;
  margin-bottom: 1.5vh;
  cursor: pointer;
`;

const Subtitle = styled.div`
  font-family: 'TT Commons Pro Variable','Segoe UI','Arial',sans-serif;
  font-weight: 600;
  font-size: 1rem;
  line-height: 1.5rem;
`

const SearchContainer = styled.div`
  padding: 5px;
  margin-top: 5vh;
  border-width: 2px;
  border-radius: .25rem;
  width: 90%;
  height: auto;
  align-items: center;
  display: flex;
  border-style: solid;
  border-color: #9face4;
`

const SearchBar = styled.input`
  font-family: 'TT Commons Pro Variable','Segoe UI','Arial',sans-serif;
  color: #9face4;
  width: 20vw;
  border: none;
  &:focus {
    outline: none;
  }
  ::placeholder {
    color :#9face4;
  }
`

const OverlayFilter = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const PopupFilter = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 300px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 30%;
  position: relative;
  font-family: 'TT Commons Pro Variable','Segoe UI','Arial',sans-serif;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  line-height: 1;
`;

const SortByBar = styled.select`
  font-family: 'TT Commons Pro Variable','Segoe UI','Arial',sans-serif;
  font-weight: 400;
  color: gray;
  padding: 8px;
  margin-top: 1.5vh;
  width: 10%;
  border-radius: .25rem;
`

const CourseCardContainer = styled.div`
  font-family: 'TT Commons Pro Variable','Segoe UI','Arial',sans-serif;
  width: 90%;
  height: auto;
  display: flex;
  flex-wrap: wrap;
  row-gap: 20px;
  column-gap: 2%;
  padding-top: 3%;
`

const CourseCard = styled.div`
  padding: 2%;
  flex-grow: 1;
  flex-basis: 20%;
  display: flex;
  border-radius: 8px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
  flex-direction: row;
  flex-wrap: wrap;
  cursor: pointer;
  &:hover {
    background-color: #f3f4f6;
  }
`

const CourseCardCode = styled.div`
  font-weight: 650;
  font-size: 1.5rem;
  line-height: 2rem;
  padding-right: 38%;
`

const CourseCardTitle = styled.div`
  font-size: 0.8rem;
  font-weight: 400;
`

const CourseCardAvailability = styled.div`
  display: flex;
  column-gap: 0.5vw;
`

const TermBubble = styled.div`
  background-color: #d2eaf5;
  border-radius: 15px;
  font-size: 12px;
  padding: 5px;
`

const CourseCardRating = styled.div`
  position: relative;
  display: inline-block;
  color: #ccc;
  font-size: 24px;
`

const RatingOverlay = styled.span`
  color: #b08bdf;
  overflow: hidden;
  display: inline-block;
  position: relative;
  white-space: nowrap;
`

const ReviewCount = styled.div`
  color: grey;
  font-size: 12px;
`

const RatingAndReview = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`

const TitleAndAvailability = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 6vh;
`

function App() {
  const rotationDegrees = 90;
  const [titleState, setTitleState] = useState(false); // false for blue, true for purple
  const [searchInput, setSearchInput] = useState('');
  const [searchBarPopup, setSearchBarPopup] = useState(false);
  const [sortValue, setSortValue] = useState('');
  let courseData = initialCoursesData;

  const handleClick = () => {
    setTitleState(!titleState);
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const lowerCase = event.target.value.toLowerCase();
    setSearchInput(lowerCase);
  };

  interface Props {
    onClose: () => void;
  }

  const FilterPopup: React.FC<Props> = ({ onClose }) => {
    return (
      <OverlayFilter>
        <PopupFilter>
          <CloseButton onClick={onClose}>×</CloseButton>
            why not just ask to make the search bar work, what is this :sob:

            well, the search bar has all of its functionality coded including filtering,
            you just can't access cus of this clicking thing lol
        </PopupFilter> 
      </OverlayFilter>
    );
  };

  courseData = courseData
  .filter((course) => {
    if (searchInput == '') {
      return initialCoursesData;
    } else if (course.course_prefix.toLowerCase().includes(searchInput.toLowerCase()) || String(course.course_code).includes(searchInput.toLowerCase())) {
      return course;
    }
  })

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newSort = event.target.value;
    setSortValue(newSort);

    switch (sortValue) {
      case 'alphabetical':
        courseData = courseData.sort((a,b) => a.course_title.localeCompare(b.course_title));
        break;
      case 'rating':
        courseData = courseData.sort((a,b) => b.average_stars - a.average_stars);
        break;
      default:
        courseData; // no sort
    }
  }

  function StarRating(averageStars: any) {
    const overallRating = averageStars.averageStars;
    const percentage =
    overallRating > 0 && overallRating <= 5
      ? (overallRating / 5) * 100
      : 0;

    return (
      <CourseCardRating>
        <span style={{position: 'absolute' }}>★★★★★</span>
        <RatingOverlay style={{width:`${percentage}%`}}>
          <span>★★★★★</span>
        </RatingOverlay>
      </CourseCardRating>
    )
  }

  return (
    <LayoutContainer>
      <SideBar>
        <Logo src={logoImage}/>
        <GrayLine/>
        <IconBox><BookOpenIcon/></IconBox>
        <PaddingBox1/>
        <IconBox><ShieldCheckIcon/></IconBox>
        <PaddingBox2/>
        <IconBox><BarsArrowUpIcon style={{ transform: `rotate(${rotationDegrees}deg)` }}/></IconBox>
        <PaddingBox1/>
        <IconBox><UserCircleIcon/></IconBox>
        <PaddingBox1/>
        <IconBox><MoonIcon/></IconBox>
        <PaddingBox1/>
        <IconBox><ArrowRightEndOnRectangleIcon/></IconBox>
      </SideBar>
      <MainContent>
        <DevSocPresents>DevSoc presents</DevSocPresents>
        <Title
          onClick={handleClick}
          style={{color: titleState ? '#c1b2ed' : '#3877ea'}}
        >
          unilectives
        </Title>
        <Subtitle>Your one-stop shop for UNSW course and elective reviews.</Subtitle>
        <SearchContainer onClick={() => setSearchBarPopup(true)}>
          <MagnifyingGlassIcon
            style={{color: '#9face4', height: '3vh', width: 'auto', paddingRight: '1vw'}}
          />
          <SearchBar
            type="text"
            placeholder="Search for a course e.g. COMP1511"
            value={searchInput}
            onChange={handleSearchChange}
          />
        </SearchContainer>
        {searchBarPopup && <FilterPopup onClose={() => setSearchBarPopup(false)} />}
        <SortByBar id="sortby" value={sortValue} onChange={e => handleSortChange(e)}>
        {sortValue === '' && <option value="" disabled>Sort By</option>}
        <option value="alphabetical">Alphabetical (A-Z)</option>
        <option value="rating">Overall Rating</option>
        </SortByBar>
        <CourseCardContainer>
          {courseData.length === 0 ? (
            <>
              Not gonna be active on Discord tonight. I'm meeting a girl (a real one) in half an hour (wouldn't expect a lot of
              you to understand anyway) so please don't DM me asking me where I am (im with the girl, ok) you'll most likely get
              aired because ill be with the girl (again I don't expect you to understand) shes actually really interested in me
              and its not a situation i can pass up for some meaningless Discord degenerates (because ill be meeting a girl, not
              that you really are going to understand) this is my life now. Meeting women and not wasting my precious time online,
              I have to move on from such simp things and branch out (you wouldnt understand)
            </>
          ) : (
            courseData.map((course) => (
              <CourseCard>
                <CourseCardCode>{course.course_prefix + course.course_code}</CourseCardCode>
                <RatingAndReview>
                  <StarRating averageStars={course.average_stars}></StarRating>
                  <ReviewCount>{course.total_reviews + " reviews"}</ReviewCount>
                </RatingAndReview>
                <TitleAndAvailability>
                  <CourseCardTitle>{course.course_title}</CourseCardTitle>
                  <CourseCardAvailability>
                    {course.offered_terms.length === 0 ? (
                      <>
                        Not Available
                      </>
                    ) : (
                      course.offered_terms.map((term) => (
                        <TermBubble>{term}</TermBubble>
                      ))
                    )}  
                  </CourseCardAvailability>
                </TitleAndAvailability>
              </CourseCard>
            ))
          )}
        </CourseCardContainer>
      </MainContent>
    </LayoutContainer>
  )
}

export default App;
