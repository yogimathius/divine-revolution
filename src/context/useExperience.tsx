import { useContext } from 'react';
import {ExperienceContext} from './ExperienceContext';

export const useExperience = () => useContext(ExperienceContext);
