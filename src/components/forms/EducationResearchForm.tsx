import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { GraduationCap, Search, Loader2, BookOpen } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

const educationSchema = z.object({
  level: z.string().min(1, 'Please select an education level'),
  marksObtained: z.string().optional(),
  state: z.string().min(1, 'Please select a state'),
  city: z.string().optional(),
  mode: z.string().min(1, 'Please select a learning mode'),
  interests: z.string().min(10, 'Please describe your interests (minimum 10 characters)'),
  futureGoals: z.string().min(10, 'Please describe your future goals (minimum 10 characters)'),
});

type EducationFormData = z.infer<typeof educationSchema>;

interface EducationResearchFormProps {
  onSubmit: (data: EducationFormData) => void;
  onBack: () => void;
  isLoading?: boolean;
}

const EDUCATION_LEVELS = [
  { value: '10th', label: '10th Grade', previousLevel: 'Marks Obtained in 9th' },
  { value: '12th', label: '12th Grade', previousLevel: 'Marks Obtained in 10th' },
  { value: 'graduation', label: 'Graduation', previousLevel: 'Marks Obtained in 12th' },
  { value: 'postGraduation', label: 'Post Graduation', previousLevel: 'Marks Obtained in Graduation' },
  { value: 'phd', label: 'PhD', previousLevel: 'Marks Obtained in Post Graduation' },
];

const LEARNING_MODES = [
  { value: 'online', label: 'Online' },
  { value: 'offline', label: 'Offline' },
  { value: 'hybrid', label: 'Hybrid' },
];

export const EducationResearchForm: React.FC<EducationResearchFormProps> = ({
  onSubmit,
  onBack,
  isLoading = false
}) => {
  const [states, setStates] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [loadingCities, setLoadingCities] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid }
  } = useForm<EducationFormData>({
    resolver: zodResolver(educationSchema),
    mode: 'onChange'
  });

  const selectedLevel = watch('level');
  const selectedState = watch('state');

  // Get previous level label
  const getPreviousLevelLabel = (level: string) => {
    const levelData = EDUCATION_LEVELS.find(l => l.value === level);
    return levelData?.previousLevel;
  };

  // Fetch Indian states on component mount
  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await fetch('https://countriesnow.space/api/v0.1/countries/states', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ country: 'India' })
        });
        const data = await response.json();
        if (data.data && data.data.states) {
          setStates(data.data.states.map((state: any) => state.name));
        }
      } catch (error) {
        console.error('Failed to fetch states:', error);
      }
    };
    fetchStates();
  }, []);

  // Fetch cities when state changes
  useEffect(() => {
    if (selectedState) {
      setLoadingCities(true);
      const fetchCities = async () => {
        try {
          const response = await fetch('https://countriesnow.space/api/v0.1/countries/state/cities', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ country: 'India', state: selectedState })
          });
          const data = await response.json();
          if (data.data) {
            setCities(data.data);
          }
        } catch (error) {
          console.error('Failed to fetch cities:', error);
        } finally {
          setLoadingCities(false);
        }
      };
      fetchCities();
      setValue('city', '');
    }
  }, [selectedState, setValue]);

  const previousLevelLabel = selectedLevel ? getPreviousLevelLabel(selectedLevel) : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-2xl mx-auto"
    >
      <Card className="bg-gradient-to-br from-slate-800/95 to-purple-900/95 backdrop-blur-md border-purple-500/30">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-white flex items-center">
            <GraduationCap className="w-6 h-6 mr-3 text-purple-400" />
            Education Research Form
          </CardTitle>
          <p className="text-gray-300">
            Help us understand your educational background and goals to provide personalized career guidance and recommendations.
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Education Level */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-white">Education Level *</label>
              <Select onValueChange={(value) => setValue('level', value)}>
                <SelectTrigger className="bg-slate-700/50 border-purple-500/30 text-white">
                  <SelectValue placeholder="Select education level" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-purple-500/30">
                  {EDUCATION_LEVELS.map((level) => (
                    <SelectItem key={level.value} value={level.value} className="text-white hover:bg-purple-500/20">
                      {level.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.level && (
                <p className="text-red-400 text-sm">{errors.level.message}</p>
              )}
            </div>

            {/* Previous Level Marks */}
            {previousLevelLabel && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-white">{previousLevelLabel}</label>
                <Input
                  {...register('marksObtained')}
                  placeholder="Enter your marks/percentage"
                  className="bg-slate-700/50 border-purple-500/30 text-white placeholder-gray-400"
                />
              </div>
            )}

            {/* State Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-white">Preferred State *</label>
              <Select onValueChange={(value) => setValue('state', value)}>
                <SelectTrigger className="bg-slate-700/50 border-purple-500/30 text-white">
                  <SelectValue placeholder="Select a state" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-purple-500/30">
                  {states.map((state) => (
                    <SelectItem key={state} value={state} className="text-white hover:bg-purple-500/20">
                      {state}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.state && (
                <p className="text-red-400 text-sm">{errors.state.message}</p>
              )}
            </div>

            {/* City Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-white">Preferred City (Optional)</label>
              <Select 
                onValueChange={(value) => setValue('city', value)}
                disabled={!selectedState || loadingCities}
              >
                <SelectTrigger className="bg-slate-700/50 border-purple-500/30 text-white">
                  <SelectValue placeholder={loadingCities ? "Loading cities..." : "Select a city"} />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-purple-500/30">
                  {cities.map((city) => (
                    <SelectItem key={city} value={city} className="text-white hover:bg-purple-500/20">
                      {city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Learning Mode */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-white">Mode of Education *</label>
              <Select onValueChange={(value) => setValue('mode', value)}>
                <SelectTrigger className="bg-slate-700/50 border-purple-500/30 text-white">
                  <SelectValue placeholder="Select learning mode" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-purple-500/30">
                  {LEARNING_MODES.map((mode) => (
                    <SelectItem key={mode.value} value={mode.value} className="text-white hover:bg-purple-500/20">
                      {mode.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.mode && (
                <p className="text-red-400 text-sm">{errors.mode.message}</p>
              )}
            </div>

            {/* Interests & Hobbies */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-white">Your Interests & Hobbies *</label>
              <Textarea
                {...register('interests')}
                placeholder="Describe your interests, hobbies, and what you're passionate about..."
                className="bg-slate-700/50 border-purple-500/30 text-white placeholder-gray-400 min-h-[100px]"
              />
              {errors.interests && (
                <p className="text-red-400 text-sm">{errors.interests.message}</p>
              )}
            </div>

            {/* Future Goals */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-white">Your Future Goals & Aspirations *</label>
              <Textarea
                {...register('futureGoals')}
                placeholder="Share your career aspirations, long-term goals, and what you want to achieve..."
                className="bg-slate-700/50 border-purple-500/30 text-white placeholder-gray-400 min-h-[100px]"
              />
              {errors.futureGoals && (
                <p className="text-red-400 text-sm">{errors.futureGoals.message}</p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Button
                type="button"
                onClick={onBack}
                variant="ghost"
                className="flex-1 text-gray-400 hover:text-white"
              >
                Back
              </Button>
              <Button
                type="submit"
                variant="gradient"
                disabled={!isValid || isLoading}
                className="flex-1"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Researching...
                  </>
                ) : (
                  <>
                    <BookOpen className="w-4 h-4 mr-2" />
                    Start Research
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};
