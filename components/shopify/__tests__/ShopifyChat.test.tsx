/**
 * Unit Tests for ShopifyChat Component
 * Tests rendering, user interactions, mode switching, and credit management
 */

import '@testing-library/jest-dom'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ShopifyChat } from '../ShopifyChat'

// Mock useSearchParams
const mockSearchParams = new URLSearchParams()
jest.mock('next/navigation', () => ({
  useSearchParams: () => mockSearchParams,
}))

// Mock fetch
global.fetch = jest.fn()

describe('ShopifyChat Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockSearchParams.set('shop', 'test-store.myshopify.com')
  })

  describe('Rendering', () => {
    it('should render floating button when closed', () => {
      render(<ShopifyChat />)

      const button = screen.getByRole('button', { name: /open seo assistant/i })
      expect(button).toBeInTheDocument()
      expect(button).toHaveClass('fixed', 'bottom-6', 'right-6')
    })

    it('should have proper accessibility attributes on floating button', () => {
      render(<ShopifyChat />)

      const button = screen.getByRole('button', { name: /open seo assistant/i })
      expect(button).toHaveAttribute('title', 'Open SEO Assistant')
      expect(button).toHaveAttribute('aria-label', 'Open SEO Assistant Chat')
    })

    it('should display chat interface when opened', async () => {
      render(<ShopifyChat />)

      const openButton = screen.getByRole('button', { name: /open seo assistant/i })
      fireEvent.click(openButton)

      await waitFor(() => {
        expect(screen.getByText('SEO Assistant')).toBeInTheDocument()
      })
    })

    it('should show empty state initially', async () => {
      render(<ShopifyChat />)

      fireEvent.click(screen.getByRole('button', { name: /open seo assistant/i }))

      await waitFor(() => {
        expect(screen.getByText(/ask me anything about seo optimization/i)).toBeInTheDocument()
      })
    })

    it('should render quick action buttons in empty state', async () => {
      render(<ShopifyChat />)

      fireEvent.click(screen.getByRole('button', { name: /open seo assistant/i }))

      await waitFor(() => {
        expect(screen.getByText('Improve product SEO')).toBeInTheDocument()
        expect(screen.getByText('Common SEO mistakes')).toBeInTheDocument()
      })
    })
  })

  describe('Store Context Loading', () => {
    it('should fetch store context when chat opens', async () => {
      const mockContextData = {
        success: true,
        data: {
          executionMode: 'PLAN',
          productCount: 50,
          issueCount: 10,
          planName: 'GROWTH',
          credits: {
            used: 25,
            limit: 500,
            remaining: 475,
          },
        },
      }

      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockContextData,
      })

      render(<ShopifyChat />)
      fireEvent.click(screen.getByRole('button', { name: /open seo assistant/i }))

      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledWith(
          expect.stringContaining('/api/shopify/context?shop=test-store.myshopify.com')
        )
      })
    })

    it('should display credit information after loading context', async () => {
      const mockContextData = {
        success: true,
        data: {
          executionMode: 'PLAN',
          productCount: 50,
          issueCount: 10,
          planName: 'GROWTH',
          credits: {
            used: 25,
            limit: 500,
            remaining: 475,
          },
        },
      }

      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockContextData,
      })

      render(<ShopifyChat />)
      fireEvent.click(screen.getByRole('button', { name: /open seo assistant/i }))

      await waitFor(() => {
        expect(screen.getByText(/475\/500 credits/i)).toBeInTheDocument()
      })
    })

    it('should display execution mode buttons', async () => {
      const mockContextData = {
        success: true,
        data: {
          executionMode: 'PLAN',
          productCount: 50,
          issueCount: 10,
          planName: 'GROWTH',
          credits: { used: 25, limit: 500, remaining: 475 },
        },
      }

      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockContextData,
      })

      render(<ShopifyChat />)
      fireEvent.click(screen.getByRole('button', { name: /open seo assistant/i }))

      await waitFor(() => {
        expect(screen.getByText(/⚡ Auto/)).toBeInTheDocument()
        expect(screen.getByText(/📋 Plan/)).toBeInTheDocument()
        expect(screen.getByText(/✓ Approve/)).toBeInTheDocument()
      })
    })

    it('should handle context fetch errors gracefully', async () => {
      ;(global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'))

      render(<ShopifyChat />)
      fireEvent.click(screen.getByRole('button', { name: /open seo assistant/i }))

      // Should still render chat interface
      await waitFor(() => {
        expect(screen.getByText('SEO Assistant')).toBeInTheDocument()
      })
    })
  })

  describe('Message Sending', () => {
    it('should send message when clicking send button', async () => {
      const mockResponse = {
        success: true,
        data: {
          message: 'Here are some SEO tips...',
          credits: { used: 26, limit: 500, remaining: 474 },
        },
      }

      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      })

      render(<ShopifyChat />)
      fireEvent.click(screen.getByRole('button', { name: /open seo assistant/i }))

      await waitFor(() => {
        expect(screen.getByPlaceholderText(/ask about seo/i)).toBeInTheDocument()
      })

      const input = screen.getByPlaceholderText(/ask about seo/i)
      const sendButton = screen.getByRole('button', { name: '' })

      await userEvent.type(input, 'How can I improve my SEO?')
      fireEvent.click(sendButton)

      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledWith(
          '/api/shopify/chat',
          expect.objectContaining({
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: expect.stringContaining('How can I improve my SEO?'),
          })
        )
      })
    })

    it('should display user message immediately', async () => {
      ;(global.fetch as jest.Mock).mockImplementation(() => new Promise(() => {})) // Never resolves

      render(<ShopifyChat />)
      fireEvent.click(screen.getByRole('button', { name: /open seo assistant/i }))

      await waitFor(() => {
        expect(screen.getByPlaceholderText(/ask about seo/i)).toBeInTheDocument()
      })

      const input = screen.getByPlaceholderText(/ask about seo/i)
      await userEvent.type(input, 'Test message')

      const sendButton = screen.getByRole('button', { name: '' })
      fireEvent.click(sendButton)

      await waitFor(() => {
        expect(screen.getByText('Test message')).toBeInTheDocument()
      })
    })

    it('should show loading indicator while waiting for response', async () => {
      ;(global.fetch as jest.Mock).mockImplementation(
        () => new Promise((resolve) => setTimeout(resolve, 1000))
      )

      render(<ShopifyChat />)
      fireEvent.click(screen.getByRole('button', { name: /open seo assistant/i }))

      await waitFor(() => {
        expect(screen.getByPlaceholderText(/ask about seo/i)).toBeInTheDocument()
      })

      const input = screen.getByPlaceholderText(/ask about seo/i)
      await userEvent.type(input, 'Test message')

      const sendButton = screen.getByRole('button', { name: '' })
      fireEvent.click(sendButton)

      await waitFor(() => {
        // Should show loading dots
        expect(screen.getByRole('button', { name: '' })).toBeDisabled()
      })
    })

    it('should display assistant response', async () => {
      const mockResponse = {
        success: true,
        data: {
          message: 'Here are some SEO tips for your store...',
          credits: { used: 26, limit: 500, remaining: 474 },
        },
      }

      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      })

      render(<ShopifyChat />)
      fireEvent.click(screen.getByRole('button', { name: /open seo assistant/i }))

      await waitFor(() => {
        expect(screen.getByPlaceholderText(/ask about seo/i)).toBeInTheDocument()
      })

      const input = screen.getByPlaceholderText(/ask about seo/i)
      await userEvent.type(input, 'Help me with SEO')

      const sendButton = screen.getByRole('button', { name: '' })
      fireEvent.click(sendButton)

      await waitFor(() => {
        expect(screen.getByText('Here are some SEO tips for your store...')).toBeInTheDocument()
      })
    })

    it('should update credit count after sending message', async () => {
      const mockContextData = {
        success: true,
        data: {
          executionMode: 'PLAN',
          productCount: 50,
          issueCount: 10,
          planName: 'GROWTH',
          credits: { used: 25, limit: 500, remaining: 475 },
        },
      }

      const mockChatResponse = {
        success: true,
        data: {
          message: 'Response',
          credits: { used: 26, limit: 500, remaining: 474 },
        },
      }

      ;(global.fetch as jest.Mock)
        .mockResolvedValueOnce({ ok: true, json: async () => mockContextData })
        .mockResolvedValueOnce({ ok: true, json: async () => mockChatResponse })

      render(<ShopifyChat />)
      fireEvent.click(screen.getByRole('button', { name: /open seo assistant/i }))

      await waitFor(() => {
        expect(screen.getByText(/475\/500 credits/i)).toBeInTheDocument()
      })

      const input = screen.getByPlaceholderText(/ask about seo/i)
      await userEvent.type(input, 'Test')
      fireEvent.click(screen.getByRole('button', { name: '' }))

      await waitFor(() => {
        expect(screen.getByText(/474\/500 credits/i)).toBeInTheDocument()
      })
    })

    it('should clear input after sending message', async () => {
      const mockResponse = {
        success: true,
        data: { message: 'Response', credits: { used: 1, limit: 100, remaining: 99 } },
      }

      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      })

      render(<ShopifyChat />)
      fireEvent.click(screen.getByRole('button', { name: /open seo assistant/i }))

      await waitFor(() => {
        expect(screen.getByPlaceholderText(/ask about seo/i)).toBeInTheDocument()
      })

      const input = screen.getByPlaceholderText(/ask about seo/i) as HTMLTextAreaElement
      await userEvent.type(input, 'Test message')
      expect(input.value).toBe('Test message')

      fireEvent.click(screen.getByRole('button', { name: '' }))

      await waitFor(() => {
        expect(input.value).toBe('')
      })
    })

    it('should handle keyboard shortcuts (Enter to send)', async () => {
      const mockResponse = {
        success: true,
        data: { message: 'Response', credits: { used: 1, limit: 100, remaining: 99 } },
      }

      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      })

      render(<ShopifyChat />)
      fireEvent.click(screen.getByRole('button', { name: /open seo assistant/i }))

      await waitFor(() => {
        expect(screen.getByPlaceholderText(/ask about seo/i)).toBeInTheDocument()
      })

      const input = screen.getByPlaceholderText(/ask about seo/i)
      await userEvent.type(input, 'Test message{enter}')

      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledWith(
          '/api/shopify/chat',
          expect.any(Object)
        )
      })
    })

    it('should allow Shift+Enter for new line without sending', async () => {
      render(<ShopifyChat />)
      fireEvent.click(screen.getByRole('button', { name: /open seo assistant/i }))

      await waitFor(() => {
        expect(screen.getByPlaceholderText(/ask about seo/i)).toBeInTheDocument()
      })

      const input = screen.getByPlaceholderText(/ask about seo/i)
      fireEvent.keyDown(input, { key: 'Enter', shiftKey: true })

      expect(global.fetch).not.toHaveBeenCalled()
    })

    it('should not send empty messages', async () => {
      render(<ShopifyChat />)
      fireEvent.click(screen.getByRole('button', { name: /open seo assistant/i }))

      await waitFor(() => {
        expect(screen.getByPlaceholderText(/ask about seo/i)).toBeInTheDocument()
      })

      const sendButton = screen.getByRole('button', { name: '' })
      fireEvent.click(sendButton)

      expect(global.fetch).not.toHaveBeenCalled()
    })

    it('should not send whitespace-only messages', async () => {
      render(<ShopifyChat />)
      fireEvent.click(screen.getByRole('button', { name: /open seo assistant/i }))

      await waitFor(() => {
        expect(screen.getByPlaceholderText(/ask about seo/i)).toBeInTheDocument()
      })

      const input = screen.getByPlaceholderText(/ask about seo/i)
      await userEvent.type(input, '   ')

      const sendButton = screen.getByRole('button', { name: '' })
      fireEvent.click(sendButton)

      expect(global.fetch).not.toHaveBeenCalled()
    })
  })

  describe('Error Handling', () => {
    it('should display error message on API error', async () => {
      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        json: async () => ({
          success: false,
          error: { message: 'Insufficient credits' },
        }),
      })

      render(<ShopifyChat />)
      fireEvent.click(screen.getByRole('button', { name: /open seo assistant/i }))

      await waitFor(() => {
        expect(screen.getByPlaceholderText(/ask about seo/i)).toBeInTheDocument()
      })

      const input = screen.getByPlaceholderText(/ask about seo/i)
      await userEvent.type(input, 'Test message')
      fireEvent.click(screen.getByRole('button', { name: '' }))

      await waitFor(() => {
        expect(screen.getByText(/insufficient credits/i)).toBeInTheDocument()
      })
    })

    it('should display error banner', async () => {
      ;(global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'))

      render(<ShopifyChat />)
      fireEvent.click(screen.getByRole('button', { name: /open seo assistant/i }))

      await waitFor(() => {
        expect(screen.getByPlaceholderText(/ask about seo/i)).toBeInTheDocument()
      })

      const input = screen.getByPlaceholderText(/ask about seo/i)
      await userEvent.type(input, 'Test')
      fireEvent.click(screen.getByRole('button', { name: '' }))

      await waitFor(() => {
        const errorBanner = screen.getByText(/failed to send message/i)
        expect(errorBanner).toBeInTheDocument()
      })
    })

    it('should allow dismissing error message', async () => {
      ;(global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'))

      render(<ShopifyChat />)
      fireEvent.click(screen.getByRole('button', { name: /open seo assistant/i }))

      await waitFor(() => {
        expect(screen.getByPlaceholderText(/ask about seo/i)).toBeInTheDocument()
      })

      const input = screen.getByPlaceholderText(/ask about seo/i)
      await userEvent.type(input, 'Test')
      fireEvent.click(screen.getByRole('button', { name: '' }))

      await waitFor(() => {
        expect(screen.getByText(/failed to send message/i)).toBeInTheDocument()
      })

      const closeButtons = screen.getAllByRole('button')
      const dismissButton = closeButtons.find(btn =>
        btn.querySelector('svg')?.classList.contains('lucide-x')
      )

      if (dismissButton) {
        fireEvent.click(dismissButton)
        await waitFor(() => {
          expect(screen.queryByText(/failed to send message/i)).not.toBeInTheDocument()
        })
      }
    })

    it('should handle network errors', async () => {
      ;(global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Failed to fetch'))

      render(<ShopifyChat />)
      fireEvent.click(screen.getByRole('button', { name: /open seo assistant/i }))

      await waitFor(() => {
        expect(screen.getByPlaceholderText(/ask about seo/i)).toBeInTheDocument()
      })

      const input = screen.getByPlaceholderText(/ask about seo/i)
      await userEvent.type(input, 'Test')
      fireEvent.click(screen.getByRole('button', { name: '' }))

      await waitFor(() => {
        expect(screen.getByText(/failed to send message/i)).toBeInTheDocument()
      })
    })
  })

  describe('Execution Mode Switching', () => {
    it('should change execution mode when clicking mode button', async () => {
      const mockContextData = {
        success: true,
        data: {
          executionMode: 'PLAN',
          productCount: 50,
          issueCount: 10,
          planName: 'GROWTH',
          credits: { used: 25, limit: 500, remaining: 475 },
        },
      }

      const mockModeChangeResponse = {
        success: true,
        data: { executionMode: 'AUTOMATIC' },
      }

      ;(global.fetch as jest.Mock)
        .mockResolvedValueOnce({ ok: true, json: async () => mockContextData })
        .mockResolvedValueOnce({ ok: true, json: async () => mockModeChangeResponse })

      render(<ShopifyChat />)
      fireEvent.click(screen.getByRole('button', { name: /open seo assistant/i }))

      await waitFor(() => {
        expect(screen.getByText(/⚡ Auto/)).toBeInTheDocument()
      })

      const autoButton = screen.getByText(/⚡ Auto/)
      fireEvent.click(autoButton)

      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledWith(
          '/api/shopify/execution-mode',
          expect.objectContaining({
            method: 'POST',
            body: expect.stringContaining('AUTOMATIC'),
          })
        )
      })
    })

    it('should display system message after mode change', async () => {
      const mockContextData = {
        success: true,
        data: {
          executionMode: 'PLAN',
          productCount: 50,
          issueCount: 10,
          planName: 'GROWTH',
          credits: { used: 25, limit: 500, remaining: 475 },
        },
      }

      const mockModeChangeResponse = {
        success: true,
        data: { executionMode: 'AUTOMATIC' },
      }

      ;(global.fetch as jest.Mock)
        .mockResolvedValueOnce({ ok: true, json: async () => mockContextData })
        .mockResolvedValueOnce({ ok: true, json: async () => mockModeChangeResponse })

      render(<ShopifyChat />)
      fireEvent.click(screen.getByRole('button', { name: /open seo assistant/i }))

      await waitFor(() => {
        expect(screen.getByText(/⚡ Auto/)).toBeInTheDocument()
      })

      const autoButton = screen.getByText(/⚡ Auto/)
      fireEvent.click(autoButton)

      await waitFor(() => {
        expect(screen.getByText(/execution mode changed to.*automatic/i)).toBeInTheDocument()
      })
    })

    it('should disable current mode button', async () => {
      const mockContextData = {
        success: true,
        data: {
          executionMode: 'PLAN',
          productCount: 50,
          issueCount: 10,
          planName: 'GROWTH',
          credits: { used: 25, limit: 500, remaining: 475 },
        },
      }

      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockContextData,
      })

      render(<ShopifyChat />)
      fireEvent.click(screen.getByRole('button', { name: /open seo assistant/i }))

      await waitFor(() => {
        const planButton = screen.getByText(/📋 Plan/).closest('button')
        expect(planButton).toBeDisabled()
      })
    })

    it('should prevent multiple simultaneous mode changes', async () => {
      const mockContextData = {
        success: true,
        data: {
          executionMode: 'PLAN',
          productCount: 50,
          issueCount: 10,
          planName: 'GROWTH',
          credits: { used: 25, limit: 500, remaining: 475 },
        },
      }

      ;(global.fetch as jest.Mock)
        .mockResolvedValueOnce({ ok: true, json: async () => mockContextData })
        .mockImplementation(() => new Promise(() => {})) // Never resolves

      render(<ShopifyChat />)
      fireEvent.click(screen.getByRole('button', { name: /open seo assistant/i }))

      await waitFor(() => {
        expect(screen.getByText(/⚡ Auto/)).toBeInTheDocument()
      })

      const autoButton = screen.getByText(/⚡ Auto/).closest('button')!
      fireEvent.click(autoButton)
      fireEvent.click(autoButton)

      // Should only be called once
      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledTimes(2) // 1 for context, 1 for mode change
      })
    })
  })

  describe('Credit Display', () => {
    it('should show green color for healthy credit levels', async () => {
      const mockContextData = {
        success: true,
        data: {
          executionMode: 'PLAN',
          productCount: 50,
          issueCount: 10,
          planName: 'GROWTH',
          credits: { used: 25, limit: 500, remaining: 475 },
        },
      }

      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockContextData,
      })

      render(<ShopifyChat />)
      fireEvent.click(screen.getByRole('button', { name: /open seo assistant/i }))

      await waitFor(() => {
        const creditsElement = screen.getByText(/475\/500 credits/i)
        expect(creditsElement).toHaveClass('text-green-600')
      })
    })

    it('should show yellow color for low credit levels', async () => {
      const mockContextData = {
        success: true,
        data: {
          executionMode: 'PLAN',
          productCount: 50,
          issueCount: 10,
          planName: 'GROWTH',
          credits: { used: 490, limit: 500, remaining: 10 },
        },
      }

      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockContextData,
      })

      render(<ShopifyChat />)
      fireEvent.click(screen.getByRole('button', { name: /open seo assistant/i }))

      await waitFor(() => {
        const creditsElement = screen.getByText(/10\/500 credits/i)
        expect(creditsElement).toHaveClass('text-yellow-600')
      })
    })

    it('should show red color for critical credit levels', async () => {
      const mockContextData = {
        success: true,
        data: {
          executionMode: 'PLAN',
          productCount: 50,
          issueCount: 10,
          planName: 'GROWTH',
          credits: { used: 499, limit: 500, remaining: 1 },
        },
      }

      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockContextData,
      })

      render(<ShopifyChat />)
      fireEvent.click(screen.getByRole('button', { name: /open seo assistant/i }))

      await waitFor(() => {
        const creditsElement = screen.getByText(/1\/500 credits/i)
        expect(creditsElement).toHaveClass('text-red-600')
      })
    })
  })

  describe('Quick Actions', () => {
    it('should populate input when clicking quick action button', async () => {
      render(<ShopifyChat />)
      fireEvent.click(screen.getByRole('button', { name: /open seo assistant/i }))

      await waitFor(() => {
        expect(screen.getByText('Improve product SEO')).toBeInTheDocument()
      })

      const quickActionButton = screen.getByText('Improve product SEO')
      fireEvent.click(quickActionButton)

      const input = screen.getByPlaceholderText(/ask about seo/i) as HTMLTextAreaElement
      expect(input.value).toBe('How can I improve my product SEO?')
    })
  })

  describe('UI Interactions', () => {
    it('should close chat when clicking close button', async () => {
      render(<ShopifyChat />)
      fireEvent.click(screen.getByRole('button', { name: /open seo assistant/i }))

      await waitFor(() => {
        expect(screen.getByText('SEO Assistant')).toBeInTheDocument()
      })

      const closeButton = screen.getByRole('button', { name: /close chat/i })
      fireEvent.click(closeButton)

      await waitFor(() => {
        expect(screen.queryByText('SEO Assistant')).not.toBeInTheDocument()
        expect(screen.getByRole('button', { name: /open seo assistant/i })).toBeInTheDocument()
      })
    })

    it('should auto-resize textarea as user types', async () => {
      render(<ShopifyChat />)
      fireEvent.click(screen.getByRole('button', { name: /open seo assistant/i }))

      await waitFor(() => {
        expect(screen.getByPlaceholderText(/ask about seo/i)).toBeInTheDocument()
      })

      const textarea = screen.getByPlaceholderText(/ask about seo/i) as HTMLTextAreaElement
      const longMessage = 'Line 1\nLine 2\nLine 3\nLine 4\nLine 5'

      await userEvent.type(textarea, longMessage)

      // Textarea should adjust height (implementation uses scrollHeight)
      expect(textarea.style.height).toBeTruthy()
    })

    it('should disable input and button while sending', async () => {
      ;(global.fetch as jest.Mock).mockImplementation(
        () => new Promise((resolve) => setTimeout(resolve, 1000))
      )

      render(<ShopifyChat />)
      fireEvent.click(screen.getByRole('button', { name: /open seo assistant/i }))

      await waitFor(() => {
        expect(screen.getByPlaceholderText(/ask about seo/i)).toBeInTheDocument()
      })

      const input = screen.getByPlaceholderText(/ask about seo/i)
      await userEvent.type(input, 'Test message')

      const sendButton = screen.getByRole('button', { name: '' })
      fireEvent.click(sendButton)

      await waitFor(() => {
        expect(input).toBeDisabled()
        expect(sendButton).toBeDisabled()
      })
    })
  })

  describe('Accessibility', () => {
    it('should have proper ARIA labels', () => {
      render(<ShopifyChat />)

      const button = screen.getByRole('button', { name: /open seo assistant/i })
      expect(button).toHaveAttribute('aria-label')
    })

    it('should be keyboard navigable', async () => {
      render(<ShopifyChat />)

      const openButton = screen.getByRole('button', { name: /open seo assistant/i })
      openButton.focus()
      expect(openButton).toHaveFocus()
    })

    it('should maintain focus management in chat', async () => {
      render(<ShopifyChat />)
      fireEvent.click(screen.getByRole('button', { name: /open seo assistant/i }))

      await waitFor(() => {
        expect(screen.getByPlaceholderText(/ask about seo/i)).toBeInTheDocument()
      })

      const input = screen.getByPlaceholderText(/ask about seo/i)
      const closeButton = screen.getByRole('button', { name: /close chat/i })

      // Tab navigation should work
      input.focus()
      expect(input).toHaveFocus()
    })
  })
})
