"use client";

import { useState } from "react";

import ContentSpacing from "@/app/components/Spacing/ContentSpacing";
import Course from "./Course";
import SearchFilter from "./SearchFilter";

import brand_design from "@/public/assets/images/training/brand_design.jpg";
import cloud_computing from "@/public/assets/images/training/cloud_computing.png";
import creative_design from "@/public/assets/images/training/creative_design.avif";
import cybersecurity from "@/public/assets/images/training/cybersecurity.jpg";
import dart from "@/public/assets/images/training/dart.jpg";
import frontend from "@/public/assets/images/training/frontend.jpg";
import fullstack from "@/public/assets/images/training/fullstack.png";
import infosec from "@/public/assets/images/training/infosec.jpg";
import java from "@/public/assets/images/training/java.jpg";
import javascript from "@/public/assets/images/training/javascript.webp";
import mobile_app from "@/public/assets/images/training/mobile_app.png";
import python from "@/public/assets/images/training/python.png";
import solidity from "@/public/assets/images/training/solidity.png";
import uiux from "@/public/assets/images/training/uiux.jpg";
const initialCourses = [
  {
    image: mobile_app,
    name: "Mobile App Development (iOS/Android)",
    price: 250000,
    rating: 4.5,
    review_count: 6,
    category: "Development",
  },
  {
    image: infosec,
    name: "InfoSec (Fundamentals)",
    price: 120000,
    rating: 4.5,
    review_count: 8,
    category: "Cybersecurity",
  },
  {
    image: frontend,
    name: "Frontend Web Development (Including ReactJs)",
    price: 200000,
    rating: 4.5,
    review_count: 34,
    category: "Development",
  },
  {
    image: cybersecurity,
    name: "Cybersecurity",
    price: 350000,
    rating: 4.5,
    review_count: 34,
    category: "Cybersecurity",
  },
  {
    image: fullstack,
    name: "Fullstack Web Development (MERN stack, NextJs)",
    price: 300000,
    rating: 5,
    review_count: 12,
    category: "Development",
  },
  // {
  //   image: ethical_hacking,
  //   name: "Ethical Hacking / PenTest",
  //   price: 250000,
  //   rating: 4.5,
  //   review_count: 34,
  //   category: "Cybersecurity",
  // },
  {
    image: cloud_computing,
    name: "Cloud Computing",
    price: 180000,
    rating: 4.0,
    review_count: 4,
    category: "Infrastructure",
  },

  {
    image: uiux,
    name: "UI/UX Design",
    price: 120000,
    rating: 4.0,
    review_count: 32,
    category: "Design",
  },

  {
    image: creative_design,
    name: "Creative Design",
    price: 120000,
    rating: 3.5,
    review_count: 5,
    category: "Design",
  },

  {
    image: brand_design,
    name: "Brand Design",
    price: 120000,
    rating: 4.5,
    review_count: 8,
    category: "Design",
  },

  {
    image: python,
    name: "Python",
    price: 120000,
    rating: 4.5,
    review_count: 34,
    category: "Programming",
  },
  {
    image: javascript,
    name: "JavaScript",
    price: 120000,
    rating: 4.0,
    review_count: 4,
    category: "Programming",
  },

  {
    image: dart,
    name: "Dart",
    price: 150000,
    rating: 4.0,
    review_count: 32,
    category: "Programming",
  },

  {
    image: java,
    name: "Java",
    price: 120000,
    rating: 3.5,
    review_count: 5,
    category: "Programming",
  },

  {
    image: solidity,
    name: "Solidity (Blockchain)",
    price: 150000,
    rating: 4.5,
    review_count: 14,
    category: "Programming",
  },
];

const Courses = () => {
  const [courses, setCourses] = useState(initialCourses);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All Courses");

  // Unified filter function to apply both search and filter
  const applyFilters = (searchTerm: string, selectedFilter: string) => {
    const lowerCasedTerm = searchTerm.toLowerCase().trim(); // Normalize search term

    const filteredCourses = initialCourses.filter((course) => {
      const matchesSearchTerm =
        course.name.toLowerCase().includes(lowerCasedTerm) ||
        course.category.toLowerCase().includes(lowerCasedTerm);

      const matchesFilter =
        selectedFilter === "All Courses" ||
        selectedFilter.toLowerCase().includes(course.category.toLowerCase());

      return matchesSearchTerm && matchesFilter; // Only include courses that match both
    });

    setCourses(filteredCourses);
  };

  // Handle filter selection
  const handleSelectFilter = (selectedFilter: string) => {
    setSelectedFilter(selectedFilter); // Update the selected filter
    applyFilters(searchTerm, selectedFilter); // Reapply filters with updated filter
  };

  // Handle search input
  const handleSearchTerm = (searchTerm: string) => {
    setSearchTerm(searchTerm); // Update the search term
    applyFilters(searchTerm, selectedFilter); // Reapply filters with updated search term
  };

  return (
    <div>
      <SearchFilter
        onSelectFilter={handleSelectFilter}
        searchTerm={searchTerm}
        onHandleSearchTerm={handleSearchTerm}
      />
      <ContentSpacing />
      <ul
        className=" grid gap-x-5 gap-y-9
    lg:grid-cols-3"
      >
        {courses.map(
          ({ image, name, price, rating, review_count, category }) => (
            <Course
              category={category}
              key={name}
              image={image}
              price={price}
              name={name}
              rating={rating}
              review_count={review_count}
            />
          ),
        )}
      </ul>
    </div>
  );
};

export default Courses;
