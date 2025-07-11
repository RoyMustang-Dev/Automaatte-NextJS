import React from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Video, Search, Loader2, Camera, Film, Youtube } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

const videoShootSchema = z.object({
  projectType: z.string().min(1, 'Please select a project type'),
  budget: z.string().min(1, 'Please select your budget range'),
  duration: z.string().min(1, 'Please select video duration'),
  targetAudience: z.string().min(1, 'Please describe your target audience'),
  projectDescription: z.string().min(20, 'Please provide a detailed project description (minimum 20 characters)'),
  style: z.string().min(1, 'Please select a video style'),
  location: z.string().optional(),
  timeline: z.string().min(1, 'Please select your timeline'),
  additionalRequirements: z.string().optional(),
});

type VideoShootFormData = z.infer<typeof videoShootSchema>;

interface VideoShootResearchFormProps {
  onSubmit: (data: VideoShootFormData) => void;
  onBack: () => void;
  isLoading?: boolean;
}

const PROJECT_TYPES = [
  { value: 'youtube', label: 'YouTube Content', icon: Youtube },
  { value: 'advertisement', label: 'Advertisement/Commercial', icon: Video },
  { value: 'short-film', label: 'Short Film', icon: Film },
  { value: 'corporate', label: 'Corporate Video', icon: Video },
  { value: 'social-media', label: 'Social Media Content', icon: Camera },
  { value: 'documentary', label: 'Documentary', icon: Film },
  { value: 'music-video', label: 'Music Video', icon: Video },
];

const BUDGET_RANGES = [
  { value: 'under-50k', label: 'Under ₹50,000' },
  { value: '50k-2l', label: '₹50,000 - ₹2,00,000' },
  { value: '2l-5l', label: '₹2,00,000 - ₹5,00,000' },
  { value: '5l-10l', label: '₹5,00,000 - ₹10,00,000' },
  { value: 'above-10l', label: 'Above ₹10,00,000' },
];

const VIDEO_DURATIONS = [
  { value: 'under-1min', label: 'Under 1 minute' },
  { value: '1-3min', label: '1-3 minutes' },
  { value: '3-5min', label: '3-5 minutes' },
  { value: '5-10min', label: '5-10 minutes' },
  { value: 'above-10min', label: 'Above 10 minutes' },
];

const VIDEO_STYLES = [
  { value: 'cinematic', label: 'Cinematic' },
  { value: 'documentary', label: 'Documentary Style' },
  { value: 'animated', label: 'Animated' },
  { value: 'talking-head', label: 'Talking Head' },
  { value: 'lifestyle', label: 'Lifestyle' },
  { value: 'product-demo', label: 'Product Demo' },
  { value: 'testimonial', label: 'Testimonial' },
];

const TIMELINES = [
  { value: 'urgent', label: 'Urgent (1-2 weeks)' },
  { value: 'normal', label: 'Normal (3-4 weeks)' },
  { value: 'flexible', label: 'Flexible (1-2 months)' },
  { value: 'long-term', label: 'Long-term (2+ months)' },
];

export const VideoShootResearchForm: React.FC<VideoShootResearchFormProps> = ({
  onSubmit,
  onBack,
  isLoading = false
}) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid }
  } = useForm<VideoShootFormData>({
    resolver: zodResolver(videoShootSchema),
    mode: 'onChange'
  });

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
            <Video className="w-6 h-6 mr-3 text-purple-400" />
            Video Shoot Research Form
          </CardTitle>
          <p className="text-gray-300">
            Get comprehensive research and recommendations for your video production project.
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Project Type */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-white">Project Type *</label>
              <Select onValueChange={(value) => setValue('projectType', value)}>
                <SelectTrigger className="bg-slate-700/50 border-purple-500/30 text-white">
                  <SelectValue placeholder="Select project type" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-purple-500/30">
                  {PROJECT_TYPES.map((type) => (
                    <SelectItem key={type.value} value={type.value} className="text-white hover:bg-purple-500/20">
                      <div className="flex items-center">
                        <type.icon className="w-4 h-4 mr-2" />
                        {type.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.projectType && (
                <p className="text-red-400 text-sm">{errors.projectType.message}</p>
              )}
            </div>

            {/* Budget */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-white">Budget Range *</label>
              <Select onValueChange={(value) => setValue('budget', value)}>
                <SelectTrigger className="bg-slate-700/50 border-purple-500/30 text-white">
                  <SelectValue placeholder="Select budget range" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-purple-500/30">
                  {BUDGET_RANGES.map((budget) => (
                    <SelectItem key={budget.value} value={budget.value} className="text-white hover:bg-purple-500/20">
                      {budget.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.budget && (
                <p className="text-red-400 text-sm">{errors.budget.message}</p>
              )}
            </div>

            {/* Video Duration */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-white">Video Duration *</label>
              <Select onValueChange={(value) => setValue('duration', value)}>
                <SelectTrigger className="bg-slate-700/50 border-purple-500/30 text-white">
                  <SelectValue placeholder="Select video duration" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-purple-500/30">
                  {VIDEO_DURATIONS.map((duration) => (
                    <SelectItem key={duration.value} value={duration.value} className="text-white hover:bg-purple-500/20">
                      {duration.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.duration && (
                <p className="text-red-400 text-sm">{errors.duration.message}</p>
              )}
            </div>

            {/* Video Style */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-white">Video Style *</label>
              <Select onValueChange={(value) => setValue('style', value)}>
                <SelectTrigger className="bg-slate-700/50 border-purple-500/30 text-white">
                  <SelectValue placeholder="Select video style" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-purple-500/30">
                  {VIDEO_STYLES.map((style) => (
                    <SelectItem key={style.value} value={style.value} className="text-white hover:bg-purple-500/20">
                      {style.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.style && (
                <p className="text-red-400 text-sm">{errors.style.message}</p>
              )}
            </div>

            {/* Timeline */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-white">Timeline *</label>
              <Select onValueChange={(value) => setValue('timeline', value)}>
                <SelectTrigger className="bg-slate-700/50 border-purple-500/30 text-white">
                  <SelectValue placeholder="Select timeline" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-purple-500/30">
                  {TIMELINES.map((timeline) => (
                    <SelectItem key={timeline.value} value={timeline.value} className="text-white hover:bg-purple-500/20">
                      {timeline.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.timeline && (
                <p className="text-red-400 text-sm">{errors.timeline.message}</p>
              )}
            </div>

            {/* Target Audience */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-white">Target Audience *</label>
              <Input
                {...register('targetAudience')}
                placeholder="e.g., Young professionals, Parents, Tech enthusiasts"
                className="bg-slate-700/50 border-purple-500/30 text-white placeholder-gray-400"
              />
              {errors.targetAudience && (
                <p className="text-red-400 text-sm">{errors.targetAudience.message}</p>
              )}
            </div>

            {/* Location */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-white">Shooting Location (Optional)</label>
              <Input
                {...register('location')}
                placeholder="e.g., Mumbai, Studio, Outdoor locations"
                className="bg-slate-700/50 border-purple-500/30 text-white placeholder-gray-400"
              />
            </div>

            {/* Project Description */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-white">Project Description *</label>
              <Textarea
                {...register('projectDescription')}
                placeholder="Describe your video project in detail - the concept, message, key scenes, and what you want to achieve..."
                className="bg-slate-700/50 border-purple-500/30 text-white placeholder-gray-400 min-h-[120px]"
              />
              {errors.projectDescription && (
                <p className="text-red-400 text-sm">{errors.projectDescription.message}</p>
              )}
            </div>

            {/* Additional Requirements */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-white">Additional Requirements (Optional)</label>
              <Textarea
                {...register('additionalRequirements')}
                placeholder="Any specific equipment, crew requirements, special effects, or other considerations..."
                className="bg-slate-700/50 border-purple-500/30 text-white placeholder-gray-400"
              />
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
                    <Search className="w-4 h-4 mr-2" />
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
