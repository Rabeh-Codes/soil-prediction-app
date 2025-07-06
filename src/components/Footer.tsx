import React from 'react';

type ContactInfo = {
  name: string;
  department: string;
};

interface FooterProps {
  'aria-label'?: string;
  minimal?: boolean;
  contact?: ContactInfo;
  updateDate?: string;
}

const Footer: React.FC<FooterProps> = ({
  minimal = false,
  contact = { name: 'Paul Stackhouse', department: 'NASA POWER' },
  updateDate = 'July 2025',
  ...rest
}) => {
  return (
    <footer
      className={`flex min-h-[40px] flex-wrap items-center justify-center bg-[#0b3d91] px-8 py-2 text-[0.9rem] text-white ${
        minimal ? 'hidden md:flex' : ''
      }`}
      aria-label={rest['aria-label'] || 'Application footer'}
      role="contentinfo"
    >
      <div className="flex flex-wrap items-center justify-center gap-2 text-sm">
        <a
          href="https://www.nasa.gov/privacy"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium hover:text-yellow-300 hover:underline"
          aria-label="NASA Privacy Statement"
        >
          NASA Privacy Statement
        </a>

        <span className="mx-1" aria-hidden="true">
          |
        </span>

        <a
          href="https://www.nasa.gov/disclaimer"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium hover:text-yellow-300 hover:underline"
          aria-label="NASA Disclaimer"
        >
          Disclaimer
        </a>

        <span className="mx-1" aria-hidden="true">
          |
        </span>

        <a
          href="https://www.nasa.gov/accessibility"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium hover:text-yellow-300 hover:underline"
          aria-label="NASA Accessibility"
        >
          Accessibility
        </a>

        <span className="mx-1" aria-hidden="true">
          |
        </span>

        <span>Updated: {updateDate}</span>

        {!minimal && (
          <>
            <span className="mx-1" aria-hidden="true">
              |
            </span>
            <span>
              NASA official: <strong>{contact.name}</strong>
            </span>
            <span className="mx-1" aria-hidden="true">
              |
            </span>
            <span>
              Contact: <strong>{contact.department}</strong>
            </span>
          </>
        )}
      </div>
    </footer>
  );
};

export default Footer;
