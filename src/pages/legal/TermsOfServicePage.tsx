import React from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Scale, 
  AlertTriangle, 
  Shield, 
  CreditCard, 
  Users, 
  Globe, 
  Mail,
  Calendar,
  CheckCircle,
  XCircle,
  Gavel
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';

export const TermsOfServicePage: React.FC = () => {
  const lastUpdated = "January 15, 2025";

  const sections = [
    {
      id: "acceptance",
      title: "Acceptance of Terms",
      icon: CheckCircle,
      content: [
        {
          subtitle: "Agreement to Terms",
          text: "By accessing or using Automaatte's services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing our services."
        },
        {
          subtitle: "Legal Capacity",
          text: "You represent and warrant that you are at least 18 years of age and have the legal capacity to enter into this agreement. If you are using our services on behalf of an organization, you represent that you have the authority to bind that organization to these terms."
        }
      ]
    },
    {
      id: "services",
      title: "Description of Services",
      icon: Globe,
      content: [
        {
          subtitle: "AI Automation Platform",
          text: "Automaatte provides artificial intelligence-powered automation services, including but not limited to AI Researchers, AI Planners, document processing, and related tools (collectively, the 'Services')."
        },
        {
          subtitle: "Service Availability",
          text: "We strive to maintain high service availability but do not guarantee uninterrupted access. Services may be temporarily unavailable due to maintenance, updates, or circumstances beyond our control."
        },
        {
          subtitle: "Service Modifications",
          text: "We reserve the right to modify, suspend, or discontinue any aspect of our services at any time, with or without notice, though we will make reasonable efforts to provide advance notice of material changes."
        }
      ]
    },
    {
      id: "user-accounts",
      title: "User Accounts and Responsibilities",
      icon: Users,
      content: [
        {
          subtitle: "Account Registration",
          text: "To access certain features, you must create an account and provide accurate, complete, and current information. You are responsible for maintaining the confidentiality of your account credentials."
        },
        {
          subtitle: "Prohibited Uses",
          text: "You agree not to use our services for any unlawful purpose, to violate any applicable laws, to infringe upon intellectual property rights, to transmit harmful content, or to interfere with the operation of our services."
        },
        {
          subtitle: "Content Responsibility",
          text: "You are solely responsible for any content you submit to our services and warrant that you have all necessary rights to such content. You grant us a license to use, process, and store your content as necessary to provide our services."
        }
      ]
    },
    {
      id: "payment-terms",
      title: "Payment Terms and Billing",
      icon: CreditCard,
      content: [
        {
          subtitle: "Subscription Plans",
          text: "Our services are offered under various subscription plans with different features and pricing. By subscribing, you agree to pay all applicable fees as described in your chosen plan."
        },
        {
          subtitle: "Billing and Charges",
          text: "Subscription fees are billed in advance on a recurring basis. All fees are non-refundable except as expressly stated in our refund policy or as required by applicable law."
        },
        {
          subtitle: "Price Changes",
          text: "We reserve the right to change our pricing with at least 30 days' notice. Continued use of our services after a price change constitutes acceptance of the new pricing."
        },
        {
          subtitle: "Cancellation",
          text: "You may cancel your subscription at any time through your account settings. Cancellation will be effective at the end of your current billing period."
        }
      ]
    },
    {
      id: "intellectual-property",
      title: "Intellectual Property Rights",
      icon: Shield,
      content: [
        {
          subtitle: "Our Intellectual Property",
          text: "All content, features, and functionality of our services, including but not limited to text, graphics, logos, software, and AI models, are owned by Automaatte and are protected by copyright, trademark, and other intellectual property laws."
        },
        {
          subtitle: "User Content License",
          text: "By submitting content to our services, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, and distribute such content solely for the purpose of providing our services."
        },
        {
          subtitle: "Respect for Third-Party Rights",
          text: "You agree not to use our services in a way that infringes upon the intellectual property rights of others and to comply with all applicable copyright and trademark laws."
        }
      ]
    },
    {
      id: "privacy-data",
      title: "Privacy and Data Protection",
      icon: Shield,
      content: [
        {
          subtitle: "Privacy Policy",
          text: "Our collection, use, and protection of your personal information is governed by our Privacy Policy, which is incorporated into these Terms by reference."
        },
        {
          subtitle: "Data Processing",
          text: "By using our AI services, you consent to the processing of your inputs and data as necessary to provide the requested services, subject to our Privacy Policy and applicable data protection laws."
        }
      ]
    },
    {
      id: "disclaimers",
      title: "Disclaimers and Limitations",
      icon: AlertTriangle,
      content: [
        {
          subtitle: "Service Disclaimer",
          text: "Our services are provided 'as is' and 'as available' without warranties of any kind, either express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, or non-infringement."
        },
        {
          subtitle: "AI Accuracy",
          text: "While we strive to provide accurate and helpful AI-generated content, we do not guarantee the accuracy, completeness, or reliability of any AI outputs. Users should verify and validate AI-generated content before making important decisions."
        },
        {
          subtitle: "Limitation of Liability",
          text: "To the maximum extent permitted by law, Automaatte shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly."
        }
      ]
    },
    {
      id: "termination",
      title: "Termination",
      icon: XCircle,
      content: [
        {
          subtitle: "Termination by User",
          text: "You may terminate your account at any time by following the cancellation procedures in your account settings or by contacting us directly."
        },
        {
          subtitle: "Termination by Automaatte",
          text: "We may terminate or suspend your account immediately, without prior notice, for conduct that we believe violates these Terms or is harmful to other users, us, or third parties."
        },
        {
          subtitle: "Effect of Termination",
          text: "Upon termination, your right to use our services will cease immediately. We may delete your account and data, though we may retain certain information as required by law or for legitimate business purposes."
        }
      ]
    },
    {
      id: "governing-law",
      title: "Governing Law and Dispute Resolution",
      icon: Gavel,
      content: [
        {
          subtitle: "Governing Law",
          text: "These Terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions."
        },
        {
          subtitle: "Dispute Resolution",
          text: "Any disputes arising out of or relating to these Terms or our services shall be resolved through binding arbitration in accordance with the rules of the Indian Arbitration and Conciliation Act, 2015."
        },
        {
          subtitle: "Jurisdiction",
          text: "You agree to submit to the personal jurisdiction of the courts located in India for the purpose of litigating all such claims or disputes that cannot be resolved through arbitration."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center space-x-3 mb-6">
            <Scale className="w-8 h-8 text-purple-400" />
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              Terms of Service
            </h1>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            These Terms of Service govern your use of Automaatte's AI automation platform and services.
          </p>
          <div className="mt-6 flex items-center justify-center space-x-2 text-gray-400">
            <Calendar className="w-4 h-4" />
            <span>Last updated: {lastUpdated}</span>
          </div>
        </motion.div>

        {/* Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12"
        >
          <Card className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-sm border-purple-500/20">
            <CardContent className="p-8">
              <div className="flex items-start space-x-4">
                <AlertTriangle className="w-6 h-6 text-yellow-400 mt-1 flex-shrink-0" />
                <div>
                  <h2 className="text-xl font-bold text-white mb-3">Important Legal Agreement</h2>
                  <p className="text-gray-300 leading-relaxed">
                    These Terms of Service constitute a legally binding agreement between you and Automaatte Pvt. Ltd. 
                    Please read these terms carefully before using our services. By accessing or using our platform, 
                    you acknowledge that you have read, understood, and agree to be bound by these terms.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Terms Sections */}
        <div className="space-y-8">
          {sections.map((section, index) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
            >
              <Card className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 backdrop-blur-sm border-purple-500/20">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3 text-xl font-bold text-white">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                      <section.icon className="w-5 h-5 text-white" />
                    </div>
                    <span>{section.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {section.content.map((item, idx) => (
                    <div key={idx}>
                      <h3 className="text-lg font-semibold text-white mb-3">{item.subtitle}</h3>
                      <p className="text-gray-300 leading-relaxed">{item.text}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="mt-12"
        >
          <Card className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 backdrop-blur-sm border-purple-500/20">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3 text-xl font-bold text-white">
                <Mail className="w-6 h-6 text-purple-400" />
                <span>Contact Us About These Terms</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 leading-relaxed mb-4">
                If you have any questions about these Terms of Service or need clarification on any provisions, 
                please contact us at:
              </p>
              <div className="bg-slate-800/30 rounded-lg p-4">
                <p className="text-white font-medium">Automaatte Legal Team</p>
                <p className="text-gray-300">Email: legal@automaatte.com</p>
                <p className="text-gray-300">Address: India</p>
              </div>
              <p className="text-gray-400 text-sm mt-4">
                We will respond to your legal inquiries within 30 days of receipt.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Changes to Terms */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="mt-8"
        >
          <Card className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 backdrop-blur-sm border-purple-500/20">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3 text-xl font-bold text-white">
                <FileText className="w-6 h-6 text-purple-400" />
                <span>Changes to These Terms</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 leading-relaxed">
                We reserve the right to modify these Terms of Service at any time. We will notify users of any 
                material changes by posting the updated terms on our website and updating the "Last updated" date. 
                Your continued use of our services after such changes constitutes your acceptance of the new terms. 
                If you do not agree to the modified terms, you must discontinue use of our services.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Effective Date */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-8 text-center"
        >
          <p className="text-gray-400">
            These Terms of Service are effective as of {lastUpdated} and govern all use of Automaatte's services.
          </p>
        </motion.div>
      </div>
    </div>
  );
};
