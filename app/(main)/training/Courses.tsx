"use client";

import { useState } from "react";

import ContentSpacing from "@/app/components/Spacing/ContentSpacing";
import Course from "./Course";
import SearchFilter from "./SearchFilter";
import type { CourseView } from "./course.api";

const Courses = ({ allCourses }: { allCourses: CourseView[] }) => {
  const [courses, setCourses] = useState(allCourses);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All Courses");

  // Unified filter function to apply both search and filter
  const applyFilters = (searchTerm: string, selectedFilter: string) => {
    const lowerCasedTerm = searchTerm.toLowerCase().trim(); // Normalize search term

    const filteredCourses = allCourses.filter((course) => {
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
      {courses.length === 0 ? (
        <p className="py-10 text-center text-[#8C94A3]">
          No courses match your search.
        </p>
      ) : (
        <ul className="grid gap-x-5 gap-y-9 lg:grid-cols-3">
          {courses.map((course) => (
            <li key={course.slug}>
              <Course
                slug={course.slug}
                category={course.category}
                image={course.image}
                price={course.price}
                name={course.name}
                rating={course.rating}
                tagline={course.tagline}
                level={course.level}
                duration={course.duration}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Courses;
