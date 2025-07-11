import React from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Lock, 
  Eye, 
  Database, 
  Globe, 
  Users, 
  Mail, 
  Calendar,
  FileText,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';

export const PrivacyPolicyPage: React.FC = () => {
  const lastUpdated = "January 15, 2025";

  const sections = [
    {
      id: "information-collection",
      title: "Information We Collect",
      icon: Database,
      content: [
        {
          subtitle: "Personal Information",
          text: "We collect information you provide directly to us, including but not limited to: name, email address, company name, billing information, and any other information you choose to provide when creating an account or contacting us."
        },
        {
          subtitle: "Usage Information",
          text: "We automatically collect information about your use of our services, including IP addresses, browser type, operating system, referring URLs, access times, and pages viewed."
        },
        {
          subtitle: "AI Service Data",
          text: "When you use our AI services, we may collect and process the inputs you provide, generated outputs, and metadata related to your service usage for the purpose of providing and improving our services."
        }
      ]
    },
    {
      id: "information-use",
      title: "How We Use Your Information",
      icon: Eye,
      content: [
        {
          subtitle: "Service Provision",
          text: "We use your information to provide, maintain, and improve our AI automation services, process transactions, and provide customer support."
        },
        {
          subtitle: "Communication",
          text: "We may use your contact information to send you service-related communications, updates about our services, and respond to your inquiries."
        },
        {
          subtitle: "Analytics and Improvement",
          text: "We analyze usage patterns to improve our services, develop new features, and enhance user experience while maintaining data privacy."
        }
      ]
    },
    {
      id: "information-sharing",
      title: "Information Sharing and Disclosure",
      icon: Users,
      content: [
        {
          subtitle: "Third-Party Service Providers",
          text: "We may share your information with trusted third-party service providers who assist us in operating our services, conducting business, or serving users, provided they agree to keep this information confidential."
        },
        {
          subtitle: "Legal Requirements",
          text: "We may disclose your information if required by law, regulation, legal process, or governmental request, or to protect our rights, property, or safety, or that of others."
        },
        {
          subtitle: "Business Transfers",
          text: "In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction, subject to appropriate confidentiality protections."
        }
      ]
    },
    {
      id: "data-security",
      title: "Data Security",
      icon: Lock,
      content: [
        {
          subtitle: "Security Measures",
          text: "We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction."
        },
        {
          subtitle: "Encryption",
          text: "We use industry-standard encryption protocols to protect data in transit and at rest. All sensitive information is encrypted using advanced cryptographic standards."
        },
        {
          subtitle: "Access Controls",
          text: "Access to personal information is restricted to authorized personnel who need such access to perform their job functions and are bound by confidentiality obligations."
        }
      ]
    },
    {
      id: "data-retention",
      title: "Data Retention",
      icon: Calendar,
      content: [
        {
          subtitle: "Retention Period",
          text: "We retain your personal information for as long as necessary to provide our services, comply with legal obligations, resolve disputes, and enforce our agreements."
        },
        {
          subtitle: "Account Deletion",
          text: "Upon account termination or deletion request, we will delete or anonymize your personal information within a reasonable timeframe, except where retention is required by law."
        }
      ]
    },
    {
      id: "your-rights",
      title: "Your Rights and Choices",
      icon: CheckCircle,
      content: [
        {
          subtitle: "Access and Correction",
          text: "You have the right to access, update, or correct your personal information. You can do this through your account settings or by contacting us directly."
        },
        {
          subtitle: "Data Portability",
          text: "You have the right to request a copy of your personal information in a structured, commonly used, and machine-readable format."
        },
        {
          subtitle: "Deletion Rights",
          text: "You may request deletion of your personal information, subject to certain legal limitations and our legitimate business interests."
        },
        {
          subtitle: "Opt-Out Rights",
          text: "You may opt out of receiving promotional communications from us by following the unsubscribe instructions in those communications or contacting us directly."
        }
      ]
    },
    {
      id: "international-transfers",
      title: "International Data Transfers",
      icon: Globe,
      content: [
        {
          subtitle: "Cross-Border Processing",
          text: "Your information may be processed and stored in countries other than your country of residence. We ensure appropriate safeguards are in place for such transfers."
        },
        {
          subtitle: "Adequacy Decisions",
          text: "We rely on adequacy decisions, standard contractual clauses, or other appropriate safeguards when transferring personal information internationally."
        }
      ]
    },
    {
      id: "cookies",
      title: "Cookies and Tracking Technologies",
      icon: FileText,
      content: [
        {
          subtitle: "Cookie Usage",
          text: "We use cookies and similar tracking technologies to enhance your experience, analyze usage patterns, and provide personalized content."
        },
        {
          subtitle: "Cookie Management",
          text: "You can control cookie settings through your browser preferences. However, disabling certain cookies may affect the functionality of our services."
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
            <Shield className="w-8 h-8 text-purple-400" />
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              Privacy Policy
            </h1>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Your privacy is important to us. This Privacy Policy explains how Automaatte collects, uses, and protects your information.
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
                  <h2 className="text-xl font-bold text-white mb-3">Important Notice</h2>
                  <p className="text-gray-300 leading-relaxed">
                    This Privacy Policy applies to all users of Automaatte's services, including our website, AI automation tools, 
                    and related services (collectively, the "Services"). By using our Services, you consent to the collection, 
                    use, and disclosure of your information as described in this Privacy Policy.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Privacy Sections */}
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
                <span>Contact Us About Privacy</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 leading-relaxed mb-4">
                If you have any questions about this Privacy Policy, our privacy practices, or your rights regarding 
                your personal information, please contact us at:
              </p>
              <div className="bg-slate-800/30 rounded-lg p-4">
                <p className="text-white font-medium">Automaatte Privacy Team</p>
                <p className="text-gray-300">Email: privacy@automaatte.com</p>
                <p className="text-gray-300">Address: India</p>
              </div>
              <p className="text-gray-400 text-sm mt-4">
                We will respond to your privacy-related inquiries within 30 days of receipt.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Changes to Policy */}
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
                <span>Changes to This Privacy Policy</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 leading-relaxed">
                We may update this Privacy Policy from time to time to reflect changes in our practices, 
                technology, legal requirements, or other factors. We will notify you of any material changes 
                by posting the updated Privacy Policy on our website and updating the "Last updated" date. 
                Your continued use of our Services after such changes constitutes your acceptance of the updated Privacy Policy.
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
            This Privacy Policy is effective as of {lastUpdated} and applies to all information collected by Automaatte.
          </p>
        </motion.div>
      </div>
    </div>
  );
};
